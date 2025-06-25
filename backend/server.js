// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Allow cross-origin requests (no credentials/cookies now)
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://bookreview-platform.netlify.app',
      'https://bookreviewplatform-3.onrender.com',
    ],
    optionsSuccessStatus: 200,
  })
);

// Parse JSON requests
app.use(express.json());

// API Routes
app.get('/', (_req, res) => {
  res.send('📚 Book Review Platform API is running...');
});

app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);

// Error Handlers
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
