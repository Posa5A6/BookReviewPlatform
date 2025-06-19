// backend/middleware/authMiddleware.js
// Used ONLY for admin routes that rely on Bearer‑token JWTs.

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

/**
 * protect ─ Verify JWT token, attach user to req
 * @access Admin (Bearer token)
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (err) {
      res.status(401);
      throw new Error('Not authorized – token invalid');
    }
  }

  res.status(401);
  throw new Error('Not authorized – no token');
});

/**
 * admin ─ Ensure the authenticated user has role === 'admin'
 * @access Admin
 */
const admin = (req, _res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  const err = new Error('Not authorized as admin');
  err.status = 403;
  next(err);
};

export { protect, admin };
