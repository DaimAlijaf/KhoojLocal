const Vendor = require("../models/Vendor");

// Helper function to calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

// Helper function to check if business is currently open
const isBusinessOpen = (businessHours) => {
  const now = new Date();
  const dayOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ][now.getDay()];

  const todayHours = businessHours[dayOfWeek];
  if (!todayHours || todayHours.isClosed) {
    return false;
  }

  const currentTime = now.getHours() * 60 + now.getMinutes();
  const [openHour, openMin] = todayHours.open.split(":").map(Number);
  const [closeHour, closeMin] = todayHours.close.split(":").map(Number);

  const openTime = openHour * 60 + openMin;
  const closeTime = closeHour * 60 + closeMin;

  return currentTime >= openTime && currentTime <= closeTime;
};

// @desc    Enhanced search businesses with filters
// @route   GET /api/search/businesses
// @access  Public
const searchBusinesses = async (req, res) => {
  try {
    const {
      search,
      category,
      minRating,
      maxDistance,
      openNow,
      sortBy,
      latitude,
      longitude,
      page = 1,
      limit = 20,
    } = req.query;

    // Base query: only approved and active vendors
    let query = { status: "Approved", isActive: true };

    // Category filter
    if (category && category !== "all") {
      query.category = category;
    }

    // Search filter (business name, description, services)
    if (search) {
      query.$or = [
        { businessName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { services: { $elemMatch: { $regex: search, $options: "i" } } },
      ];
    }

    // Rating filter (BR-6: minimum rating ≥ 3.0)
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    } else {
      query.rating = { $gte: 3.0 }; // Default minimum rating
    }

    // Get vendors
    let vendors = await Vendor.find(query).select("-password").lean();

    // Distance filter (if user location provided)
    if (latitude && longitude && maxDistance) {
      const userLat = parseFloat(latitude);
      const userLon = parseFloat(longitude);
      const maxDist = parseFloat(maxDistance);

      vendors = vendors.filter((vendor) => {
        if (
          !vendor.address?.coordinates?.latitude ||
          !vendor.address?.coordinates?.longitude
        ) {
          return false;
        }

        const distance = calculateDistance(
          userLat,
          userLon,
          vendor.address.coordinates.latitude,
          vendor.address.coordinates.longitude
        );

        vendor.distance = distance; // Add distance to vendor object
        return distance <= maxDist;
      });
    } else if (latitude && longitude) {
      // Calculate distance but don't filter
      const userLat = parseFloat(latitude);
      const userLon = parseFloat(longitude);

      vendors = vendors.map((vendor) => {
        if (
          vendor.address?.coordinates?.latitude &&
          vendor.address?.coordinates?.longitude
        ) {
          vendor.distance = calculateDistance(
            userLat,
            userLon,
            vendor.address.coordinates.latitude,
            vendor.address.coordinates.longitude
          );
        }
        return vendor;
      });
    }

    // Open now filter
    if (openNow === "true") {
      vendors = vendors.filter((vendor) => {
        if (!vendor.businessHours) return false;
        return isBusinessOpen(vendor.businessHours);
      });

      // Add isOpen flag to each vendor
      vendors = vendors.map((vendor) => ({
        ...vendor,
        isOpen: true,
      }));
    } else {
      // Add isOpen flag for all vendors
      vendors = vendors.map((vendor) => ({
        ...vendor,
        isOpen: vendor.businessHours
          ? isBusinessOpen(vendor.businessHours)
          : false,
      }));
    }

    // Sorting
    switch (sortBy) {
      case "rating":
        vendors.sort((a, b) => b.rating - a.rating);
        break;
      case "distance":
        if (latitude && longitude) {
          vendors.sort((a, b) => (a.distance || 999) - (b.distance || 999));
        }
        break;
      case "reviews":
        vendors.sort((a, b) => b.totalReviews - a.totalReviews);
        break;
      case "newest":
        vendors.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // Default: sort by rating then distance
        vendors.sort((a, b) => {
          if (b.rating !== a.rating) {
            return b.rating - a.rating;
          }
          return (a.distance || 999) - (b.distance || 999);
        });
    }

    // Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedVendors = vendors.slice(startIndex, endIndex);

    res.json({
      success: true,
      count: paginatedVendors.length,
      total: vendors.length,
      page: parseInt(page),
      pages: Math.ceil(vendors.length / parseInt(limit)),
      vendors: paginatedVendors,
    });
  } catch (error) {
    console.error("Search businesses error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get business recommendations (AI-powered - simplified version)
// @route   GET /api/search/recommendations
// @access  Private (User)
const getRecommendations = async (req, res) => {
  try {
    const { latitude, longitude, limit = 10 } = req.query;

    // In production: Use actual AI recommendation engine
    // For now: Return top-rated businesses near user

    let query = {
      status: "Approved",
      isActive: true,
      rating: { $gte: 4.0 },
      totalReviews: { $gte: 5 },
    };

    let vendors = await Vendor.find(query)
      .select("-password")
      .limit(parseInt(limit) * 2) // Get more for filtering
      .lean();

    // If user location provided, calculate distances
    if (latitude && longitude) {
      const userLat = parseFloat(latitude);
      const userLon = parseFloat(longitude);

      vendors = vendors
        .map((vendor) => {
          if (
            vendor.address?.coordinates?.latitude &&
            vendor.address?.coordinates?.longitude
          ) {
            vendor.distance = calculateDistance(
              userLat,
              userLon,
              vendor.address.coordinates.latitude,
              vendor.address.coordinates.longitude
            );
          } else {
            vendor.distance = 999;
          }
          return vendor;
        })
        .filter((v) => v.distance <= 25); // Within 25km
    }

    // Sort by rating and distance
    vendors.sort((a, b) => {
      const scoreA = a.rating * 10 - (a.distance || 0);
      const scoreB = b.rating * 10 - (b.distance || 0);
      return scoreB - scoreA;
    });

    // Add isOpen flag
    vendors = vendors.map((vendor) => ({
      ...vendor,
      isOpen: vendor.businessHours
        ? isBusinessOpen(vendor.businessHours)
        : false,
    }));

    res.json({
      success: true,
      count: vendors.slice(0, parseInt(limit)).length,
      message: "Personalized recommendations based on ratings and location",
      recommendations: vendors.slice(0, parseInt(limit)),
    });
  } catch (error) {
    console.error("Get recommendations error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get nearby businesses
// @route   GET /api/search/nearby
// @access  Public
const getNearbyBusinesses = async (req, res) => {
  try {
    const { latitude, longitude, radius = 10, limit = 20 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "Please provide latitude and longitude",
      });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);
    const maxRadius = parseFloat(radius);

    // Get all active vendors
    let vendors = await Vendor.find({
      status: "Approved",
      isActive: true,
      rating: { $gte: 3.0 },
    })
      .select("-password")
      .lean();

    // Calculate distances and filter
    vendors = vendors
      .map((vendor) => {
        if (
          vendor.address?.coordinates?.latitude &&
          vendor.address?.coordinates?.longitude
        ) {
          vendor.distance = calculateDistance(
            userLat,
            userLon,
            vendor.address.coordinates.latitude,
            vendor.address.coordinates.longitude
          );
          vendor.isOpen = vendor.businessHours
            ? isBusinessOpen(vendor.businessHours)
            : false;
          return vendor;
        }
        return null;
      })
      .filter((v) => v && v.distance <= maxRadius)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, parseInt(limit));

    res.json({
      success: true,
      count: vendors.length,
      radius: maxRadius,
      center: { latitude: userLat, longitude: userLon },
      businesses: vendors,
    });
  } catch (error) {
    console.error("Get nearby businesses error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get business categories with counts
// @route   GET /api/search/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Vendor.aggregate([
      { $match: { status: "Approved", isActive: true } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      categories: categories.map((cat) => ({
        name: cat._id,
        count: cat.count,
      })),
    });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  searchBusinesses,
  getRecommendations,
  getNearbyBusinesses,
  getCategories,
};
