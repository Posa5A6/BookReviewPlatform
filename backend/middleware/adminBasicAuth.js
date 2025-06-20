// backend/middleware/adminBasicAuth.js
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'; // if your passwords are hashed

const adminBasicAuth = asyncHandler(async (req, res, next) => {
  // Expect:  Authorization: Basic base64(email:password)
  const authHeader = req.headers.authorization || '';

  if (!authHeader.startsWith('Basic ')) {
    res.status(401);
    throw new Error('Missing Basic auth header');
  }

  const base64Creds = authHeader.split(' ')[1];
  const [email, password] = Buffer.from(base64Creds, 'base64')
    .toString()
    .split(':');

  const user = await User.findOne({ email });
  if (
    !user ||
    user.role !== 'admin' ||
    !(await bcrypt.compare(password, user.password))
  ) {
    res.status(403);
    throw new Error('Invalid admin credentials');
  }

  req.user = user; // attach for downstream handlers if needed
  next();
});

export default adminBasicAuth;
