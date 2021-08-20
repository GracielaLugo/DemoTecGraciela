var CarreraModel = require('../models/carrera.model');

/**
 * carrera.controller.js
 *
 * @description :: Server-side logic for managing carreras.
 */
module.exports = {
  /**
   * carreraController.list()
   */
  list: function (req, res) {
    CarreraModel.find(function (err, carreras) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting carrera.',
          error: err,
        });
      }

      return res.json(carreras);
    });
  },

  /**
   * carreraController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    CarreraModel.findOne({ _id: id }, function (err, carrera) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting carrera.',
          error: err,
        });
      }

      if (!carrera) {
        return res.status(404).json({
          message: 'No such carrera',
        });
      }

      return res.json(carrera);
    });
  },

  /**
   * carreraController.create()
   */
  create: function (req, res) {
    var carrera = new CarreraModel({
      nombre: req.body.nombre,
      createdAt: req.body.createdAt,
    });

    carrera.save(function (err, carrera) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating carrera',
          error: err,
        });
      }

      return res.status(201).json(carrera);
    });
  },

  /**
   * carreraController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    CarreraModel.findOne({ _id: id }, function (err, carrera) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting carrera',
          error: err,
        });
      }

      if (!carrera) {
        return res.status(404).json({
          message: 'No such carrera',
        });
      }

      carrera.nombre = req.body.nombre ? req.body.nombre : carrera.nombre;
      carrera.createdAt = req.body.createdAt ? req.body.createdAt : carrera.createdAt;

      carrera.save(function (err, carrera) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating carrera.',
            error: err,
          });
        }

        return res.json(carrera);
      });
    });
  },

  /**
   * carreraController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    CarreraModel.findByIdAndRemove(id, function (err, carrera) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the carrera.',
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
