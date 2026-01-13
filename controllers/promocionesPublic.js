const express = require('express');
const router = express.Router();
const promotion = require('../models/promotion');

// Listar solo promociones activas
router.get('/', async (req, res) => {
  try {
    const today = new Date();
    const promos = await promotion.find({
      startDate: { $lte: today },
      endDate: { $gte: today }
    });
    res.json(promos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;