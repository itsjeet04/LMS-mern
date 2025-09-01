import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './configs/mongoDB.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';
import courseRouter from './routes/courseRoutes.js';

// Connect to MongoDB
await connectDB();
connectCloudinary();

const app = express();

// Middleware
app.use(cors());
app.use(clerkMiddleware()); // Clerk attaches req.auth if valid Authorization header is present

// --- Clerk Webhook route (must come BEFORE express.json()) ---
app.post(
  '/clerk',
  express.raw({
    type: 'application/json', // raw body for svix verification
    verify: (req, res, buf) => {
      req.rawBody = buf; // save raw body for webhook verification
    },
  }),
  clerkWebhooks
);

// --- Now parse JSON globally for all OTHER routes ---
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Educator routes (protected with Clerk auth)
app.use('/api/educator', educatorRouter);
//course routes
app.use('/api/course' , express.json() , courseRouter)

// Error handling middleware (keep this at the end)
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
