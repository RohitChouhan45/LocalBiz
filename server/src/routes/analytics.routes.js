const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { protect } = require('./business.routes');

const prisma = new PrismaClient();

// @desc    Record a visit/event
// @route   POST /api/analytics
router.post('/', async (req, res) => {
  const { businessId, eventType, metadata } = req.body;

  try {
    const event = await prisma.analytics.create({
      data: { businessId, eventType, metadata }
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Get analytics for a business
// @route   GET /api/analytics/:businessId
router.get('/:businessId', protect, async (req, res) => {
    try {
      const business = await prisma.business.findFirst({
        where: { id: req.params.businessId, ownerId: req.user.id }
      });

      if (!business) return res.status(403).json({ message: 'Not authorized' });

      const stats = await prisma.analytics.groupBy({
        by: ['eventType'],
        where: { businessId: req.params.businessId },
        _count: true
      });

      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
