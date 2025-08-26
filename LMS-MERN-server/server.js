import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './configs/mongoDB.js';
import { clerkWebhooks } from './controllers/webHooks.js';

// express init
const app = express();

// Database connection
await connectDB();

// Middleware
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('API is running...')
    }
)
app.post('/clerk' ,express.json(), clerkWebhooks )

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})