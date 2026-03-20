const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { protect } = require('./business.routes');

const prisma = new PrismaClient();

// @desc    Add a service to a business
// @route   POST /api/services
router.post('/', protect, async (req, res) => {
  const { businessId, name, description, price, duration, image } = req.body;

  try {
    const business = await prisma.business.findFirst({
      where: { id: businessId, ownerId: req.user.id }
    });

    if (!business) return res.status(403).json({ message: 'Not authorized' });

    const service = await prisma.service.create({
      data: { businessId, name, description, price: price ? parseFloat(price) : null, duration, image }
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
