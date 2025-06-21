// backend/middleware/adminSessionProtect.js
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const adminSessionProtect = asyncHandler(async (req, res, next) => {
  if (!req.session.userId) {
    res.status(401);
    throw new Error('Not logged in');
  }

  const user = await User.findById(req.session.userId);

  if (!user || user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized as admin');
  }

  req.user = user;
  next();
});

export default adminSessionProtect;
