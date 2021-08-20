var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HorarioSchema = new Schema({
  maestroId: {
    type: Schema.Types.ObjectId,
    ref: 'Maestro',
    required: true,
  },
  diaSemana: { type: Number, required: true, min: 1, max: 7 },
  horaInicio: { type: String, required: true },
  horaFin: { type: String, required: true },
  asignaturaId: {
    type: Schema.Types.ObjectId,
    ref: 'Asignatura',
    required: true,
  },
  grupoId: {
    type: Schema.Types.ObjectId,
    ref: 'Grupo',
  },
  ubicacionId: {
    type: Schema.Types.ObjectId,
    ref: 'Ubicacion',
  },
  createdAt: Date,
});

module.exports = mongoose.model('Horario', HorarioSchema);
