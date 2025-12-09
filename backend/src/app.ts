import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import sequelize from './utils/db';
import User from './models/User';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => res.send('API Running'));

// Sync models
sequelize.sync({ alter: true }).then(() => {
  console.log('All models synced');
});

export default app;
