import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// ----------------------------
// 🧑‍💻 USER AUTHENTICATION
// ----------------------------

/**
 * @desc   Register a new normal user
 * @route  POST /api/auth/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password });

  if (user.role === 'admin') {
    res.status(403);
    throw new Error('Admins must be created manually');
  }

  req.session.userId = user._id;

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    message: 'User registered and logged in',
  });
});

/**
 * @desc   Login normal user (session)
 * @route  POST /api/auth/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  if (user.role === 'admin') {
    res.status(403);
    throw new Error('Use /api/auth/admin/login for admin login');
  }

  req.session.userId = user._id;

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    message: 'User logged in with session',
  });
});

/**
 * @desc   Logout normal user
 * @route  POST /api/auth/logout
 * @access User only
 */
const logoutUser = (req, res) => {
  if (!req.session) {
    return res.status(400).json({ message: 'No session found' });
  }

  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }

    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'User logged out successfully' });
  });
};

// ----------------------------
// 👨‍💼 ADMIN AUTHENTICATION
// ----------------------------

/**
 * @desc   Login admin user (JWT)
 * @route  POST /api/auth/admin/login
 * @access Admin only
 */
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  if (user.role !== 'admin') {
    res.status(403);
    throw new Error('Access denied: Not an admin');
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
});

export { registerUser, loginUser, logoutUser, loginAdmin };
