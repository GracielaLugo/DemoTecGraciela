var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ubicacionSchema = new Schema({
  nombre: { type: String, unique: true, required: true },
  createdAt: Date,
});

module.exports = mongoose.model('Ubicacion', ubicacionSchema, 'ubicaciones');
