import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

/**
 * @desc   Get user's profile (publicly accessible via userId)
 * @route  POST /api/users/profile
 * @access Public (controlled by frontend role logic)
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(401);
    throw new Error('User ID is required');
  }

  const user = await User.findById(userId).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(user);
});

/**
 * @desc   Update user's profile (name, email, password)
 * @route  PUT /api/users/profile
 * @access Public (authenticated via localStorage)
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const { userId, name, email, password } = req.body;

  if (!userId) {
    res.status(401);
    throw new Error('User ID is required');
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = name || user.name;
  user.email = email || user.email;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
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
