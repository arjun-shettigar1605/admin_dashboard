const express = require("express");
const router = express.Router();
const { changePassword, getUserById, getProfile, editProfile } = require("../controllers/userController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

// @route   GET api/users/profile
// @desc    Get current user's profile
// @access  Private
router.get('/profile', protect, getProfile);

// @route   PUT api/users/profile
// @desc    Update current user's profile
// @access  Private
router.put('/profile', protect, editProfile);

// @route   PUT api/users/change-password
// @desc    Change user's password
// @access  Private (requires token)
router.put("/change-password", protect, changePassword);

// @route   GET api/users/:id
// @desc    Get user by ID (Admin only)
// @access  Private/Admin
router.get('/:id', [protect, isAdmin], getUserById);

module.exports = router;
