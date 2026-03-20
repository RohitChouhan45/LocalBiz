const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await prisma.user.findUnique({ 
          where: { id: decoded.id },
          select: { id: true, email: true, name: true, subscription: true }
      });
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// @desc    Get all businesses for the logged-in user
// @route   GET /api/businesses
router.get('/', protect, async (req, res) => {
  try {
    const businesses = await prisma.business.findMany({
      where: { ownerId: req.user.id },
      include: { products: true, services: true }
    });
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Create a new business
// @route   POST /api/businesses
router.post('/', protect, async (req, res) => {
  const { name, category, slug, description, phone, email, address, templateId } = req.body;

  try {
    const slugExists = await prisma.business.findUnique({ where: { slug } });
    if (slugExists) {
      return res.status(400).json({ message: 'URL Slug already taken' });
    }

    const business = await prisma.business.create({
      data: {
        name,
        category,
        slug,
        description,
        phone,
        email,
        address,
        templateId: templateId || 'default',
        ownerId: req.user.id
      },
    });

    res.status(201).json(business);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Get a single business by slug (Public)
// @route   GET /api/businesses/site/:slug
router.get('/site/:slug', async (req, res) => {
    try {
      const business = await prisma.business.findUnique({
        where: { slug: req.params.slug },
        include: { products: true, services: true }
      });
  
      if (!business) {
        return res.status(404).json({ message: 'Business not found' });
      }
  
      res.json(business);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

module.exports = { router, protect };
