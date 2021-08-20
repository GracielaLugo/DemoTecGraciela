var AsignaturaModel = require('../models/asignatura.model');

/**
 * asignatura.controller.js
 *
 * @description :: Server-side logic for managing asignaturas.
 */
module.exports = {
  /**
   * asignaturaController.list()
   */
  list: function (req, res) {
    AsignaturaModel.find(function (err, asignaturas) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting asignatura.',
          error: err,
        });
      }

      return res.json(asignaturas);
    });
  },

  /**
   * asignaturaController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    AsignaturaModel.findOne({ _id: id }, function (err, asignatura) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting asignatura.',
          error: err,
        });
      }

      if (!asignatura) {
        return res.status(404).json({
          message: 'No such asignatura',
        });
      }

      return res.json(asignatura);
    });
  },

  /**
   * asignaturaController.create()
   */
  create: function (req, res) {
    var asignatura = new AsignaturaModel({
      nombre: req.body.nombre,
      tipo: req.body.tipo,
      createdAt: req.body.createdAt,
    });

    asignatura.save(function (err, asignatura) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating asignatura',
          error: err,
        });
      }

      return res.status(201).json(asignatura);
    });
  },

  /**
   * asignaturaController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    AsignaturaModel.findOne({ _id: id }, function (err, asignatura) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting asignatura',
          error: err,
        });
      }

      if (!asignatura) {
        return res.status(404).json({
          message: 'No such asignatura',
        });
      }

      asignatura.nombre = req.body.nombre ? req.body.nombre : asignatura.nombre;
      asignatura.tipo = req.body.tipo ? req.body.tipo : asignatura.tipo;
      asignatura.createdAt = req.body.createdAt ? req.body.createdAt : asignatura.createdAt;

      asignatura.save(function (err, asignatura) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating asignatura.',
            error: err,
          });
        }

        return res.json(asignatura);
      });
    });
  },

  /**
   * asignaturaController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    AsignaturaModel.findByIdAndRemove(id, function (err, asignatura) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the asignatura.',
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
