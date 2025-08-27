import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './configs/mongoDB.js';
import { clerkWebhooks } from './controllers/webhooks.js';

const app = express();

// Middleware
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Webhook route with raw body parsing - BEFORE express.json()
app.post('/clerk', express.raw({ type: 'application/json' }), clerkWebhooks);

// Parse JSON globally for other routes - AFTER webhook route
app.use(express.json()); // Parse JSON globally , linked with req.body 

// Database connection middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Add your other routes here
// Example: app.use('/api/users', userRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Export for Vercel - this is crucial for serverless
export default app;