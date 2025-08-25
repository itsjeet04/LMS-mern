import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// express init
const app = express();

// Middleware
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('API is running...')
}
)

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})