// models/Promotion.js
const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['diaria', 'semanal'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  label: { type: String }, // opcional
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('promotion', promotionSchema);