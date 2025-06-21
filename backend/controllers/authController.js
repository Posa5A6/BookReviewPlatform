// backend/controllers/authController.js

import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

/* ------------------------------------------------------------------ */
/*  REGISTER USER  – POST /api/auth/register                          */
/* ------------------------------------------------------------------ */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: 'user',
  });

  req.session.userId = user._id;

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    message: 'User registered and logged in',
  });
});

/* ------------------------------------------------------------------ */
/*  USER LOGIN  – POST /api/auth/login                                */
/* ------------------------------------------------------------------ */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  if (user.role !== 'user') {
    res.status(403);
    throw new Error('Access denied: Not a normal user');
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

/* ------------------------------------------------------------------ */
/*  ADMIN LOGIN  – POST /api/auth/admin                               */
/* ------------------------------------------------------------------ */
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (
    user &&
    user.role === 'admin' &&
    (await bcrypt.compare(password, user.password))
  ) {
    req.session.userId = user._id;

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: 'admin',
      },
      message: 'Admin logged in successfully',
    });
  } else {
    res.status(401);
    throw new Error('Invalid admin credentials');
  }
});

/* ------------------------------------------------------------------ */
/*  LOGOUT  – POST /api/auth/logout                                   */
/* ------------------------------------------------------------------ */
const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'User logged out successfully' });
  });
};

/* ------------------------------------------------------------------ */
/*  GET CURRENT USER  – GET /api/auth/me                              */
/* ------------------------------------------------------------------ */
const getMe = asyncHandler(async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    res.status(401);
    throw new Error('Not logged in');
  }

  const user = await User.findById(userId).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

export {
  registerUser,
  loginUser,
  adminLogin,
  logoutUser,
  getMe,
};
