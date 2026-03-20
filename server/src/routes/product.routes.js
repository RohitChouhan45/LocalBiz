const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { protect } = require('./business.routes');

const prisma = new PrismaClient();

// @desc    Add a product to a business
// @route   POST /api/products
router.post('/', protect, async (req, res) => {
  const { businessId, name, description, price, image } = req.body;

  try {
    // Verify ownership
    const business = await prisma.business.findFirst({
      where: { id: businessId, ownerId: req.user.id }
    });

    if (!business) return res.status(403).json({ message: 'Not authorized for this business' });

    const product = await prisma.product.create({
      data: { businessId, name, description, price: parseFloat(price), image }
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
router.delete('/:id', protect, async (req, res) => {
    try {
      const product = await prisma.product.findUnique({ where: { id: req.params.id }, include: { business: true } });
      if (!product || product.business.ownerId !== req.user.id) {
          return res.status(403).json({ message: 'Not authorized or product not found' });
      }

      await prisma.product.delete({ where: { id: req.params.id } });
      res.json({ message: 'Product removed' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
