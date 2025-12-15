import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import sequelize from './utils/db';
import { initModels } from './models';
import productRoutes from './routes/products';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Test route
app.get('/', (req, res) => res.send('API Running'));

// Sync models
initModels();


export default app;
