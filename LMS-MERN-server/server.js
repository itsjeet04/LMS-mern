import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './configs/mongoDB.js';
import { clerkWebhooks } from './controllers/webhooks.js';

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Webhook route with the CORRECT raw body parsing 
// This MUST come BEFORE express.json()
app.post(
  '/clerk',
  express.raw({
    type: 'application/json', //the request body format is JSON.
    // Add the verify function to attach the raw body
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  }),
  clerkWebhooks
);

// Parse JSON globally for all OTHER routes
app.use(express.json());



// Add your other API routes here
// Example: app.use('/api/users', userRoutes);

// Error handling middleware (keep this at the end)
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

export default app;