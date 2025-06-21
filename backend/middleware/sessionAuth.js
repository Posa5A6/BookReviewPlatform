import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const sessionProtect = asyncHandler(async (req, res, next) => {
  // 1. Ensure session has a userId
  if (!req.session.userId) {
    res.status(401);
    throw new Error('Not logged in');
  }

  // 2. Fetch the user
  const user = await User.findById(req.session.userId).select('-password');

  // 3. Validate user existence
  if (!user) {
    res.status(401);              // or 404, but 401 is common for stale sessions
    throw new Error('User not found or session invalid');
  }

  // 4. Attach user and proceed
  req.user = user;
  next();
});

export default sessionProtect;
