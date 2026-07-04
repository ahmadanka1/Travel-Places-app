import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';
import placeRoutes from './routes/placeRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/places', commentRoutes);

const port = process.env.PORT || 5000;

connectDB();

app.get('/', (req, res) => {
    res.send('Express Server is running...');
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
