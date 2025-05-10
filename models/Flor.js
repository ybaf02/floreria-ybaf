const mongoose = require('mongoose');

const florSchema = new mongoose.Schema({
  nombre: String,
  color: String,
  precio: Number
});

module.exports = mongoose.model('Flor', florSchema);
