import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/userModel.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const existing = await User.findOne({ email: 'admin@example.com' });
    if (existing) {
      console.log('ℹ Admin already exists. Deleting and re-creating...');
      await User.deleteOne({ email: 'admin@example.com' });
    }

    const admin = new User({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin123', //  plain password; pre-save hook hashes it
      role: 'admin',
    });

    const saved = await admin.save();

    console.log(' Admin saved:', saved);
  } catch (err) {
    console.error(' Error creating admin:', err.message);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmin();
