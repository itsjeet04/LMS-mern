import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './configs/mongoDB.js';
import { clerkWebhooks } from './controllers/webHooks.js';

// express init
const app = express();

// Database connection 
connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json()); // global JSON parser

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.post('/clerk', clerkWebhooks);

//  No app.listen()
// Export the app as default for Vercel
export default app;
