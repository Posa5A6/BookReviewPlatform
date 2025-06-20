import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';  

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
 const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (
    user &&
    user.role === 'admin' &&
    (await bcrypt.compare(password, user.password))
  ) {
    // No token!  Just tell the client it’s okay.
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: 'admin',
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid admin credentials');
  }
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
 const getMe = asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Basic ')) {
    res.status(401);
    throw new Error('No Basic Auth header');
  }

  const base64Creds = authHeader.split(' ')[1];
  const [email, password] = Buffer.from(base64Creds, 'base64')
    .toString()
    .split(':');

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});
export { registerUser, loginUser , adminLogin,logoutUser , getMe };
