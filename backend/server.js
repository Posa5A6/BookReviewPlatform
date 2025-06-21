// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express
const app = express();

// Middleware
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://bookreview-platform.netlify.app',
      // add future custom domains here, e.g. 'https://books.example.com'
    ],
    credentials: true,        // sends Access‑Control‑Allow‑Credentials: true
    optionsSuccessStatus: 200 // avoids 204 issues with legacy browsers
  })
);app.use(express.json());

// Session middleware (for user login)

app.use(session({
  secret: process.env.SESSION_SECRET || 'my-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    httpOnly: true,
    secure: true,        // ✅ use true in production (HTTPS)
    sameSite: 'None',      // ✅ for localhost testing
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));


// Test route
app.get('/', (_req, res) => {
  res.send('📚 Book Review Platform API is running...');
});

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes); // This registers /api/auth/login
// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(` Server running on http://localhost:${PORT}`)
);
