var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GrupoSchema = new Schema({
  nombre: { type: String, unique: true, required: true },
  carreraId: {
    type: Schema.Types.ObjectId,
    ref: 'Carrera',
    required: true,
  },
  createdAt: Date,
});

module.exports = mongoose.model('Grupo', GrupoSchema);
