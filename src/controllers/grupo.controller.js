var GrupoModel = require('../models/grupo.model');
const catchAsync = require('../utils/catchAsync');

/**
 * grupo.controller.js
 *
 * @description :: Server-side logic for managing grupos.
 */
module.exports = {
  /**
   * grupoController.list()
   */
  list: catchAsync(async (req, res) => {
    const grupos = await GrupoModel.find({}).populate('carreraId');
    return res.json(grupos);
  }),

  /**
   * grupoController.show()
   */
  show: catchAsync(async (req, res) => {
    var id = req.params.id;

    const grupo = await GrupoModel.findOne({ _id: id }).populate('carreraId');

    if (!grupo) {
      return res.status(404).json({
        message: 'No such grupo',
      });
    }
    return res.json(grupo);
  }),

  /**
   * grupoController.create()
   */
  create: function (req, res) {
    var grupo = new GrupoModel({
      nombre: req.body.nombre,
      carreraId: req.body.carreraId,
      createdAt: req.body.createdAt,
    });

    grupo.save(function (err, grupo) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating grupo',
          error: err,
        });
      }

      return res.status(201).json(grupo);
    });
  },

  /**
   * grupoController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    GrupoModel.findOne({ _id: id }, function (err, grupo) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting grupo',
          error: err,
        });
      }

      if (!grupo) {
        return res.status(404).json({
          message: 'No such grupo',
        });
      }

      grupo.nombre = req.body.nombre ? req.body.nombre : grupo.nombre;
      grupo.carreraId = req.body.carreraId ? req.body.carreraId : grupo.carreraId;
      grupo.createdAt = req.body.createdAt ? req.body.createdAt : grupo.createdAt;

      grupo.save(function (err, grupo) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating grupo.',
            error: err,
          });
        }

        return res.json(grupo);
      });
    });
  },

  /**
   * grupoController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    GrupoModel.findByIdAndRemove(id, function (err, grupo) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the grupo.',
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
