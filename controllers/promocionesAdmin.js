// controllers/promocionesAdmin.js
const express = require('express'); //importa express para crear el router
const Promotion = require('../models/promotion'); //importa el modelo de promoción
const router = express.Router(); //crea un router de express

// Crear
//definir la ruta para crear una nueva promoción
router.post('/', async (req, res) => {
  try {
    const promo = new Promotion(req.body); //crear una nueva instancia de promoción con los datos del cuerpo de la solicitud
    await promo.save(); //guardar la promoción en la base de datos
    res.status(201).json({ message: 'Promoción creada', promo });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todas
//definir la ruta para obtener todas las promociones
router.get('/', async (req, res) => {
  try {
    const promos = await Promotion.find(); //buscar todas las promociones en la base de datos
    res.json(promos); //enviar las promociones como respuesta en formato JSON
  } catch (err) { 
    res.status(500).json({ error: err.message });
  }
});

// Obtener una promoción por ID
router.get('/:id', async (req, res) => {
  try {
    const promo = await Promotion.findById(req.params.id); //buscar la promoción por ID
    res.json(promo); //enviar la promoción como respuesta en formato JSON
  } catch (err) {
    res.status(404).json({ error: 'No encontrada' });
  }
});

// Editar 
//definir la ruta para actualizar una promoción por ID
router.put('/:id', async (req, res) => { //actualizar la promoción con los datos del cuerpo de la solicitud
  try {
    const promo = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true }); //buscar y actualizar la promoción por ID
    res.json({ message: 'Promoción actualizada', promo }); //enviar la promoción actualizada como respuesta en formato JSON
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar
router.delete('/:id', async (req, res) => { //eliminar la promoción por ID
  try {
    await Promotion.findByIdAndDelete(req.params.id); //buscar y eliminar la promoción por ID
    res.json({ message: 'Promoción eliminada' }); //enviar un mensaje de confirmación como respuesta
  } catch (err) {
    res.status(404).json({ error: 'No encontrada' });
  }
});

module.exports = router;