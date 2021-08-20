const HorariosModel = require('../models/horarios.model');
const Maestro = require('../models/maestro.model');
const Grupo = require('../models/grupo.model');
const Ubicacion = require('../models/ubicacion.model');
const Asignatura = require('../models/asignatura.model');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

/**
 * horarios.controller.js
 *
 * @description :: Server-side logic for managing horarioss.
 */
module.exports = {
  /**
   * horariosController.list()
   */
  list: catchAsync(async (req, res) => {
    const horarios = await HorariosModel.find({})
      .populate('maestroId')
      .populate('asignaturaId')
      .populate('grupoId')
      .populate('ubicacionId');
    return res.json(horarios);
  }),

  /**
   * horariosController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    HorariosModel.findOne({ _id: id }, function (err, horarios) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting horarios.',
          error: err,
        });
      }

      if (!horarios) {
        return res.status(404).json({
          message: 'No such horarios',
        });
      }

      return res.json(horarios);
    });
  },

  /**
   * horariosController.create()
   */
  create: catchAsync(async (req, res) => {
    //validar existentes
    const validMaestro = await Maestro.countDocuments({ _id: req.body.maestroId });
    console.log('Maestro', validMaestro);

    const validGrupo = await Grupo.countDocuments({ _id: req.body.grupoId });
    console.log('Grupo', validGrupo);

    const validUbicacion = await Ubicacion.countDocuments({ _id: req.body.ubicacionId });
    console.log('Ubicacion', validUbicacion);

    const validAsignatura = await Asignatura.countDocuments({ _id: req.body.asignaturaId });
    console.log('Asignatura', validAsignatura);

    if (!validMaestro || !validGrupo || !validUbicacion || !validAsignatura) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Verifica tu información');
    }

    const horario = await HorariosModel.create({
      maestroId: req.body.maestroId,
      diaSemana: req.body.diaSemana,
      asignaturaId: req.body.asignaturaId,
      grupoId: req.body.grupoId,
      ubicacionId: req.body.ubicacionId,
      horaInicio: req.body.horaInicio,
      horaFin: req.body.horaFin,
      createdAt: req.body.createdAt,
    });

    return res.status(201).json(horario);
  }),

  /**
   * horariosController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    HorariosModel.findOne({ _id: id }, function (err, horarios) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting horarios',
          error: err,
        });
      }

      if (!horarios) {
        return res.status(404).json({
          message: 'No such horarios',
        });
      }

      horarios.maestroId = req.body.maestroId ? req.body.maestroId : horarios.maestroId;
      horarios.diaSemana = req.body.diaSemana ? req.body.diaSemana : horarios.diaSemana;
      horarios.asignaturaId = req.body.asignaturaId ? req.body.asignaturaId : horarios.asignaturaId;
      horarios.grupoId = req.body.grupoId ? req.body.grupoId : horarios.grupoId;
      horarios.horaInicio = req.body.horaInicio ? req.body.horaInicio : horarios.horaInicio;
      horarios.horaFin = req.body.horaFin ? req.body.horaFin : horarios.horaFin;
      horarios.createdAt = req.body.createdAt ? req.body.createdAt : horarios.createdAt;

      horarios.save(function (err, horarios) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating horarios.',
            error: err,
          });
        }

        return res.json(horarios);
      });
    });
  },

  /**
   * horariosController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    HorariosModel.findByIdAndRemove(id, function (err, horarios) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the horarios.',
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
