const Vendor = require("../models/Vendor");
// @desc    Get approved vendors for public search
// @route   GET /api/vendors
// @access  Public
const getApprovedVendors = async (req, res) => {
  try {
    const { category, search } = req.query;

    let query = { status: "Approved", isActive: true };

    // Add category filter
    if (category && category !== "all") {
      query.category = category;
    }

    // Add search filter
    if (search) {
      query.$or = [
        { businessName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { services: { $regex: search, $options: "i" } },
      ];
    }

    const vendors = await Vendor.find(query)
      .select("-password")
      .sort({ rating: -1, createdAt: -1 });

    res.json(vendors);
  } catch (error) {
    console.error("Get approved vendors error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get vendor by ID
// @route   GET /api/vendors/:id
// @access  Public
const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).select("-password");

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Only show approved and active vendors to public
    if (vendor.status !== "Approved" || !vendor.isActive) {
      return res.status(403).json({ message: "Vendor not available" });
    }

    res.json(vendor);
  } catch (error) {
    console.error("Get vendor by ID error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getApprovedVendors, getVendorById };
