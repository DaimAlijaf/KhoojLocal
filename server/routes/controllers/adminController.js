import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Vendor from "../models/Vendor.js";
import generateToken from "../utils/generateToken.js";

// @desc    Login admin
// @route   POST /api/auth/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // Check for admin and include password field
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res
        .status(403)
        .json({ message: "Your account has been deactivated" });
    }

    // Check password
    const isPasswordMatch = await admin.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Update last login without triggering save middleware
    await Admin.findByIdAndUpdate(admin._id, { lastLogin: Date.now() });

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id, "admin"),
    });
  } catch (error) {
    console.error("Login admin error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get admin profile
// @route   GET /api/auth/admin/profile
// @access  Private/Admin
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id);

    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    console.error("Get admin profile error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/auth/admin/dashboard-stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    console.log("📊 Fetching dashboard stats...");

    // Get total users count
    const totalUsers = await User.countDocuments();
    console.log("Total Users:", totalUsers);

    // Get active users (users with isActive = true)
    const activeUsers = await User.countDocuments({
      isActive: true,
    });
    console.log("Active Users:", activeUsers);

    // Get active vendors (Note: status values are capitalized in the schema)
    const activeVendors = await Vendor.countDocuments({
      status: "Approved",
      isActive: true,
    });
    console.log("Active Vendors:", activeVendors);

    // Get pending vendor approvals
    const pendingApprovals = await Vendor.countDocuments({
      status: "Pending",
    });
    console.log("Pending Approvals:", pendingApprovals);

    // Get flagged reviews (placeholder - Review model not yet created)
    const flaggedReviews = 0;

    // Get pending vendors for list (Note: status is capitalized in the schema)
    const pendingVendors = await Vendor.find({ status: "Pending" })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("businessName category createdAt");

    // Get user growth data for last 4 weeks
    const weeklyGrowth = [];
    for (let i = 0; i < 4; i++) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (i + 1) * 7);
      const weekEnd = new Date();
      weekEnd.setDate(weekEnd.getDate() - i * 7);

      const count = await User.countDocuments({
        createdAt: { $gte: weekStart, $lt: weekEnd },
      });

      weeklyGrowth.unshift({
        week: `Week ${i + 1}`,
        users: count,
      });
    }

    res.json({
      stats: {
        totalUsers,
        activeUsers,
        activeVendors,
        pendingApprovals,
        flaggedReviews,
      },
      pendingVendors,
      weeklyGrowth,
    });
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    res.status(500).json({ message: error.message });
  }
};

export { loginAdmin, getAdminProfile, getDashboardStats };
