import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './configs/mongoDB.js';
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';
import courseRouter from './routes/courseRoutes.js';
import { userRouter } from './routes/userRoutes.js';

// Connect to MongoDB
await connectDB();
connectCloudinary();

const app = express();

// Middleware
app.use(cors());
app.use(clerkMiddleware()); // Clerk attaches req.auth if valid Authorization header is present

// --- Clerk Webhook (raw body) ---
app.post(
  '/clerk',
  express.raw({
    type: 'application/json',
    verify: (req, res, buf) => {
      req.rawBody = buf; // save raw body for Clerk verification
    },
  }),
  clerkWebhooks
);

// --- Stripe Webhook (raw body) ---
app.post(
  '/stripe',
  express.raw({ type: 'application/json' }),
  stripeWebhooks
);

// --- Now parse JSON globally for ALL other routes ---
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/educator', educatorRouter);
app.use('/api/course', courseRouter);
app.use('/api/user', userRouter);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message:
      process.env.NODE_ENV === 'development'
        ? error.message
        : 'Something went wrong',
  });
});

// Start server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

export default app;
