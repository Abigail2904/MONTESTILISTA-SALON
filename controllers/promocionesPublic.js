const express = require('express');
const router = express.Router();
const promotion = require('../models/promotion');

// Listar solo promociones activas
router.get('/', async (req, res) => { //definir la ruta para obtener promociones activas
  try { //buscar promociones activas basadas en la fecha actual
    const today = new Date(); //fecha actual
    const promos = await promotion.find({  //buscar promociones donde la fecha actual esté entre startDate y endDate
      startDate: { $lte: today }, // startDate menor o igual a hoy
      endDate: { $gte: today } // endDate mayor o igual a hoy
    });
    res.json(promos); //enviar las promociones activas como respuesta en formato JSON
  } catch (err) { //manejar errores
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;