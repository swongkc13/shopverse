import { Router } from 'express';
import Product from '../models/Product';
import { isAdmin } from '../middleware/isAdmin';
import { authMiddleware } from '../middleware/auth';

const router = Router();


router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// POST /api/products (admin only)
router.post('/', authMiddleware, isAdmin, async (req, res) => {
  const { name, description, price, imageUrl, stock } = req.body;

  if (!name || !price || stock === undefined) {
    return res.status(400).json({ message: 'Name, price, and stock are required' });
  }

  try {
    const product = await Product.create({
      name,
      description,
      price,
      imageUrl,
      stock,
    });
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create product' });
  }
});


export default router;
