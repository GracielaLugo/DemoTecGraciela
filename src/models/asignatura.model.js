var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AsignaturaSchema = new Schema({
  nombre: { type: String, unique: true, required: true },
  tipo: { type: String, enum: ['Actividad', 'Carga'] },
  createdAt: Date,
});

module.exports = mongoose.model('Asignatura', AsignaturaSchema);
