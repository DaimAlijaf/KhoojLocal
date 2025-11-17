const Vendor = require("../models/Vendor");
const generateToken = require("../utils/generateToken");
// @desc    Register new vendor
// @route   POST /api/auth/vendor/register
// @access  Public
const registerVendor = async (req, res) => {
  try {
    const {
      businessName,
      ownerName,
      email,
      password,
      phone,
      category,
      address,
      description,
      services,
      serviceType,
      images,
    } = req.body;

    // Validation
    if (
      !businessName ||
      !ownerName ||
      !email ||
      !password ||
      !phone ||
      !category
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Check if vendor already exists
    const vendorExists = await Vendor.findOne({ email });
    if (vendorExists) {
      return res
        .status(400)
        .json({ message: "Vendor already exists with this email" });
    }

    // Create vendor
    const vendor = await Vendor.create({
      businessName,
      ownerName,
      email,
      password,
      phone,
      category,
      address,
      description,
      services,
      serviceType: serviceType || "both", // booking, ordering, or both
      images: images || { logo: "", banner: "", gallery: [] },
      status: "Pending", // Vendor needs admin approval
    });

    if (vendor) {
      res.status(201).json({
        _id: vendor._id,
        businessName: vendor.businessName,
        ownerName: vendor.ownerName,
        email: vendor.email,
        phone: vendor.phone,
        category: vendor.category,
        status: vendor.status,
        message:
          "Registration successful! Your application is pending admin approval.",
        token: generateToken(vendor._id, "vendor"),
      });
    } else {
      res.status(400).json({ message: "Invalid vendor data" });
    }
  } catch (error) {
    console.error("Register vendor error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login vendor
// @route   POST /api/auth/vendor/login
// @access  Public
const loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // Check for vendor and include password field
    const vendor = await Vendor.findOne({ email }).select("+password");

    if (!vendor) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if vendor is active
    if (!vendor.isActive) {
      return res
        .status(403)
        .json({ message: "Your account has been deactivated" });
    }

    // Check if vendor is approved
    if (vendor.status === "Pending") {
      return res
        .status(403)
        .json({ message: "Your application is still pending admin approval" });
    }

    if (vendor.status === "Rejected") {
      return res
        .status(403)
        .json({ message: "Your application has been rejected" });
    }

    if (vendor.status === "Suspended") {
      return res
        .status(403)
        .json({ message: "Your account has been suspended" });
    }

    // Check password
    const isPasswordMatch = await vendor.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Update last login without triggering save middleware
    await Vendor.findByIdAndUpdate(vendor._id, { lastLogin: Date.now() });

    res.json({
      _id: vendor._id,
      businessName: vendor.businessName,
      ownerName: vendor.ownerName,
      email: vendor.email,
      phone: vendor.phone,
      category: vendor.category,
      status: vendor.status,
      token: generateToken(vendor._id, "vendor"),
    });
  } catch (error) {
    console.error("Login vendor error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get vendor profile
// @route   GET /api/auth/vendor/profile
// @access  Private
const getVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.user._id);

    if (vendor) {
      res.json(vendor);
    } else {
      res.status(404).json({ message: "Vendor not found" });
    }
  } catch (error) {
    console.error("Get vendor profile error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update vendor profile
// @route   PUT /api/auth/vendor/profile
// @access  Private
const updateVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.user._id);

    if (vendor) {
      vendor.businessName = req.body.businessName || vendor.businessName;
      vendor.ownerName = req.body.ownerName || vendor.ownerName;
      vendor.phone = req.body.phone || vendor.phone;
      vendor.address = req.body.address || vendor.address;
      vendor.description = req.body.description || vendor.description;
      vendor.services = req.body.services || vendor.services;
      vendor.businessHours = req.body.businessHours || vendor.businessHours;

      const updatedVendor = await vendor.save();
      res.json(updatedVendor);
    } else {
      res.status(404).json({ message: "Vendor not found" });
    }
  } catch (error) {
    console.error("Update vendor profile error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerVendor, loginVendor, getVendorProfile, updateVendorProfile };
