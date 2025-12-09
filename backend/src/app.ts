import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './utils/db';
import User from './models/User';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test database connection
sequelize
  .authenticate()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.error('Unable to connect:', err));

// Sync models
sequelize.sync({ alter: true }).then(() => console.log('All models synced!'));

// TEMP ROUTES FOR TESTING
app.get('/test-users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/test-users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

export default app;
