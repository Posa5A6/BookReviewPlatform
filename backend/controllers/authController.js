import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

/* ------------------------------------------------------------------ */
/*  REGISTER USER  – POST /api/auth/register                          */
/* ------------------------------------------------------------------ */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check for existing account
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Always register as “user”, not admin
  const user = await User.create({ name, email, password, role: 'user' });

  // Start session
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
/*  USER LOGIN  – POST /api/auth/login                                */
/* ------------------------------------------------------------------ */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  if (user.role !== 'user') {
    res.status(403);
    throw new Error('Access denied: Not a normal user');
  }

  // Store session
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
/*  ADMIN LOGIN  – POST /api/auth/admin                               */
/* ------------------------------------------------------------------ */
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

  // Admin also gets a session (no JWT)
  req.session.userId = user._id;

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    message: 'Admin logged in with session',
  });
});

/* ------------------------------------------------------------------ */
/*  LOGOUT  – POST /api/auth/logout                                   */
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

export { registerUser, loginUser, loginAdmin, logoutUser };
