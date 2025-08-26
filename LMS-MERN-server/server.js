import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './configs/mongoDB.js';
import { clerkWebhooks } from './controllers/webHooks.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON globally , linked with req.body 


app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.post('/clerk', express.raw({ type: 'application/json' }), clerkWebhooks);
// Using express.raw to get raw body for webhook verification

// No app.listen()
// Export for Vercel
export default app;
