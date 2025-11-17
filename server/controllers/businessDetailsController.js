const Vendor = require("../models/Vendor");
const Booking = require("../models/Booking");
// const Order = require("../models/Order"); // Order model not yet created

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

// Helper to format business hours
const formatBusinessHours = (businessHours) => {
  if (!businessHours) return null;

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return days.map((day) => {
    const hours = businessHours[day];
    return {
      day: day.charAt(0).toUpperCase() + day.slice(1),
      isOpen: !hours?.isClosed,
      hours: hours?.isClosed ? "Closed" : `${hours?.open} - ${hours?.close}`,
    };
  });
};

// @desc    Get complete business details
// @route   GET /api/businesses/:id/details
// @access  Public
const getBusinessDetails = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).select("-password");

    if (!vendor) {
      return res.status(404).json({ message: "Business not found" });
    }

    // Only show approved and active vendors to public
    if (vendor.status !== "Approved" || !vendor.isActive) {
      return res.status(403).json({ message: "Business not available" });
    }

    // Check if currently open
    const isOpen = vendor.businessHours
      ? isBusinessOpen(vendor.businessHours)
      : false;

    // Format business hours
    const formattedHours = formatBusinessHours(vendor.businessHours);

    // Get stats (total bookings and orders)
    const totalBookings = await Booking.countDocuments({
      vendor: vendor._id,
      status: { $in: ["Completed"] },
    });

    const totalOrders = await Order.countDocuments({
      vendor: vendor._id,
      status: { $in: ["Completed", "Delivered"] },
    });

    // Prepare response
    const businessDetails = {
      _id: vendor._id,
      businessName: vendor.businessName,
      ownerName: vendor.ownerName,
      category: vendor.category,
      description: vendor.description,
      rating: vendor.rating,
      totalReviews: vendor.totalReviews,
      images: vendor.images,
      address: vendor.address,
      phone: vendor.phone,
      email: vendor.email,
      services: vendor.services,
      businessHours: formattedHours,
      isOpen,
      stats: {
        totalBookings,
        totalOrders,
        completedTransactions: totalBookings + totalOrders,
      },
      createdAt: vendor.createdAt,
    };

    res.json({
      success: true,
      business: businessDetails,
    });
  } catch (error) {
    console.error("Get business details error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get business services/products
// @route   GET /api/businesses/:id/services
// @access  Public
const getBusinessServices = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).select(
      "services businessName"
    );

    if (!vendor) {
      return res.status(404).json({ message: "Business not found" });
    }

    // In a real app, services would be a separate collection with detailed info
    // For now, we'll return the services array from vendor
    const services = vendor.services.map((service, index) => ({
      id: index + 1,
      name: service,
      // In production: fetch actual price, description, duration from Service model
      description: `Professional ${service} service`,
      price: 50.0, // Mock price
      duration: 60, // Mock duration in minutes
    }));

    res.json({
      success: true,
      businessName: vendor.businessName,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get business services error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get business contact info
// @route   GET /api/businesses/:id/contact
// @access  Public
const getBusinessContact = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).select(
      "businessName phone email address"
    );

    if (!vendor) {
      return res.status(404).json({ message: "Business not found" });
    }

    res.json({
      success: true,
      contact: {
        businessName: vendor.businessName,
        phone: vendor.phone,
        email: vendor.email,
        address: vendor.address,
        // Generate directions URL (for Google Maps)
        directionsUrl: vendor.address?.coordinates
          ? `https://www.google.com/maps/dir/?api=1&destination=${vendor.address.coordinates.latitude},${vendor.address.coordinates.longitude}`
          : null,
      },
    });
  } catch (error) {
    console.error("Get business contact error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get business images
// @route   GET /api/businesses/:id/images
// @access  Public
const getBusinessImages = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).select(
      "businessName images"
    );

    if (!vendor) {
      return res.status(404).json({ message: "Business not found" });
    }

    res.json({
      success: true,
      businessName: vendor.businessName,
      images: {
        logo: vendor.images?.logo || "",
        banner: vendor.images?.banner || "",
        gallery: vendor.images?.gallery || [],
      },
    });
  } catch (error) {
    console.error("Get business images error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get business operating hours
// @route   GET /api/businesses/:id/hours
// @access  Public
const getBusinessHours = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).select(
      "businessName businessHours"
    );

    if (!vendor) {
      return res.status(404).json({ message: "Business not found" });
    }

    const isOpen = vendor.businessHours
      ? isBusinessOpen(vendor.businessHours)
      : false;
    const formattedHours = formatBusinessHours(vendor.businessHours);

    // Get today's hours
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
    const todayHours = vendor.businessHours?.[dayOfWeek];

    res.json({
      success: true,
      businessName: vendor.businessName,
      isOpen,
      today: {
        day: dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1),
        isOpen: !todayHours?.isClosed,
        hours: todayHours?.isClosed
          ? "Closed"
          : `${todayHours?.open} - ${todayHours?.close}`,
      },
      weeklyHours: formattedHours,
    });
  } catch (error) {
    console.error("Get business hours error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get business statistics
// @route   GET /api/businesses/:id/stats
// @access  Public
const getBusinessStats = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).select(
      "businessName rating totalReviews createdAt"
    );

    if (!vendor) {
      return res.status(404).json({ message: "Business not found" });
    }

    // Get completed transactions
    const completedBookings = await Booking.countDocuments({
      vendor: vendor._id,
      status: "Completed",
    });

    const completedOrders = await Order.countDocuments({
      vendor: vendor._id,
      status: { $in: ["Completed", "Delivered"] },
    });

    // Get pending requests
    const pendingRequests = await Booking.countDocuments({
      vendor: vendor._id,
      status: { $in: ["Pending Vendor Confirmation", "Pending Payment"] },
    });

    const pendingOrders = await Order.countDocuments({
      vendor: vendor._id,
      status: { $in: ["Pending Vendor Confirmation", "Pending Payment"] },
    });

    // Calculate business age in months
    const ageInMonths = Math.floor(
      (Date.now() - vendor.createdAt) / (1000 * 60 * 60 * 24 * 30)
    );

    res.json({
      success: true,
      businessName: vendor.businessName,
      stats: {
        rating: vendor.rating,
        totalReviews: vendor.totalReviews,
        completedBookings,
        completedOrders,
        totalCompleted: completedBookings + completedOrders,
        pendingRequests: pendingRequests + pendingOrders,
        memberSince: vendor.createdAt,
        ageInMonths,
      },
    });
  } catch (error) {
    console.error("Get business stats error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBusinessDetails,
  getBusinessServices,
  getBusinessContact,
  getBusinessImages,
  getBusinessHours,
  getBusinessStats,
};
