// backend/controllers/authController.js

import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

/* ------------------------------------------------------------------ */
/*  REGISTER USER – POST /api/auth/register                           */
/* ------------------------------------------------------------------ */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: 'user',
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    message: 'User registered successfully',
  });
});

/* ------------------------------------------------------------------ */
/*  USER LOGIN – POST /api/auth/login                                 */
/* ------------------------------------------------------------------ */
// authController.js
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  req.session.userId = user._id; // Storing session
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

/* ------------------------------------------------------------------ */
/*  ADMIN LOGIN – POST /api/auth/admin                                */
/* ------------------------------------------------------------------ */
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (
    user &&
    user.role === 'admin' &&
    (await bcrypt.compare(password, user.password))
  ) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: 'admin',
      message: 'Admin logged in successfully',
    });
  } else {
    res.status(401);
    throw new Error('Invalid admin credentials');
  }
});

/* ------------------------------------------------------------------ */
/*  LOGOUT – POST /api/auth/logout                                    */
/* ------------------------------------------------------------------ */
const logoutUser = (_req, res) => {
  // Nothing to destroy – handled client-side
  res.json({ message: 'Logout successful (frontend should clear localStorage)' });
};

/* ------------------------------------------------------------------ */
/*  GET CURRENT USER – GET /api/auth/me                               */
/* ------------------------------------------------------------------ */
const getMe = asyncHandler(async (req, res) => {
  // This endpoint is now useless unless you use token/session again
  res.status(401);
  throw new Error('No session support – fetch user from localStorage on frontend');
});

export {
  registerUser,
  loginUser,
  adminLogin,
  logoutUser,
  getMe,
};
