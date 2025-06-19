import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const sessionProtect = asyncHandler(async (req, res, next) => {
  if (!req.session.userId) {
    res.status(401);
    throw new Error('Not logged in');
  }
  req.user = await User.findById(req.session.userId).select('-password');
  next();
});

export default sessionProtect;
