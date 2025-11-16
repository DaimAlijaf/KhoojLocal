const User = require('../models/User');
const Vendor = require('../models/Vendor');

// @desc    Get all users (Admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all vendors (Admin only)
// @route   GET /api/admin/vendors
// @access  Private/Admin
const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({}).select('-password').sort({ createdAt: -1 });
    res.json(vendors);
  } catch (error) {
    console.error('Get all vendors error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get pending vendors (Admin only)
// @route   GET /api/admin/vendors/pending
// @access  Private/Admin
const getPendingVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({ status: 'Pending' }).select('-password').sort({ createdAt: -1 });
    res.json(vendors);
  } catch (error) {
    console.error('Get pending vendors error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user status (Admin only)
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUserStatus = async (req, res) => {
  try {
    const { isActive, name, email, phone } = req.body;
    const updateData = {};

    if (isActive !== undefined) {
      updateData.isActive = isActive;
    }

    // User information updates
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update vendor status (Admin only)
// @route   PUT /api/admin/vendors/:id
// @access  Private/Admin
const updateVendorStatus = async (req, res) => {
  try {
    const { 
      status, 
      isActive, 
      businessName,
      email,
      phone,
      category,
      address,
      description,
      ownerName,
      ownerEmail,
      ownerPhone
    } = req.body;
    
    const updateData = {};

    // Status and active updates
    if (status) {
      updateData.status = status;
      if (status === 'Approved') {
        updateData.approvedAt = Date.now();
        updateData.approvedBy = req.user._id;
      }
    }

    if (isActive !== undefined) {
      updateData.isActive = isActive;
    }

    // Business information updates
    if (businessName) updateData.businessName = businessName;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (category) updateData.category = category;
    if (description) updateData.description = description;
    if (address) updateData.address = address;
    if (ownerName) updateData.ownerName = ownerName;
    if (ownerEmail) updateData.ownerEmail = ownerEmail;
    if (ownerPhone) updateData.ownerPhone = ownerPhone;

    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.json(vendor);
  } catch (error) {
    console.error('Update vendor status error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete vendor (Admin only)
// @route   DELETE /api/admin/vendors/:id
// @access  Private/Admin
const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    console.error('Delete vendor error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getAllVendors,
  getPendingVendors,
  updateUserStatus,
  updateVendorStatus,
  deleteUser,
  deleteVendor,
};
