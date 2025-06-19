// backend/controllers/userController.js

import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

/**
 * @desc   Get current logged-in user's profile
 * @route  GET /api/users/profile
 * @access User (session)
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(user);
});

/**
 * @desc   Update user's profile (name, email, password)
 * @route  PUT /api/users/profile
 * @access User (session)
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update fields if sent
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password; // hashed automatically in model
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
    message: 'Profile updated successfully',
  });
});

export { getUserProfile, updateUserProfile };
