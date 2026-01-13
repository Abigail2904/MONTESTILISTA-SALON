// controllers/promocionesAdmin.js
const express = require('express');
const Promotion = require('../models/promotion');
const router = express.Router();

// Crear
router.post('/', async (req, res) => {
  try {
    const promo = new Promotion(req.body);
    await promo.save();
    res.status(201).json({ message: 'Promoción creada', promo });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todas
router.get('/', async (req, res) => {
  try {
    const promos = await Promotion.find();
    res.json(promos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener una
router.get('/:id', async (req, res) => {
  try {
    const promo = await Promotion.findById(req.params.id);
    res.json(promo);
  } catch (err) {
    res.status(404).json({ error: 'No encontrada' });
  }
});

// Editar
router.put('/:id', async (req, res) => {
  try {
    const promo = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Promoción actualizada', promo });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar
router.delete('/:id', async (req, res) => {
  try {
    await Promotion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Promoción eliminada' });
  } catch (err) {
    res.status(404).json({ error: 'No encontrada' });
  }
});

module.exports = router;