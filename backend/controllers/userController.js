import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

/**
 * @desc   Get current logged-in user's profile
 * @route  GET /api/users/profile
 * @access User (session)
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    res.status(401);
    throw new Error('Not authenticated');
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
 * @access User (session)
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    res.status(401);
    throw new Error('Not authenticated');
  }

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
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
