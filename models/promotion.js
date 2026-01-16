// models/Promotion.js
const mongoose = require('mongoose'); //mongoose para mongodb

const promotionSchema = new mongoose.Schema({ // Esquema de promoción
  title: { type: String, required: true }, // Título de la promoción
  description: { type: String, required: true }, // Descripción de la promoción
  type: { type: String, enum: ['diaria', 'semanal'], required: true }, // Tipo de promoción
  startDate: { type: Date, required: true }, // Fecha de inicio
  endDate: { type: Date, required: true }, // Fecha de fin
  label: { type: String }, // opcional etiqueta
  createdAt: { type: Date, default: Date.now } // Fecha de creación
});

module.exports = mongoose.model('promotion', promotionSchema);