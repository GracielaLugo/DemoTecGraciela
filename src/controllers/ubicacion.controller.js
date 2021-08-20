var UbicacionModel = require('../models/ubicacion.model.js');

/**
 * ubicacion.controller.js
 *
 * @description :: Server-side logic for managing ubicacions.
 */
module.exports = {
  /**
   * ubicacionController.list()
   */
  list: function (req, res) {
    UbicacionModel.find(function (err, ubicacions) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting ubicacion.',
          error: err,
        });
      }

      return res.json(ubicacions);
    });
  },

  /**
   * ubicacionController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    UbicacionModel.findOne({ _id: id }, function (err, ubicacion) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting ubicacion.',
          error: err,
        });
      }

      if (!ubicacion) {
        return res.status(404).json({
          message: 'No such ubicacion',
        });
      }

      return res.json(ubicacion);
    });
  },

  /**
   * ubicacionController.create()
   */
  create: function (req, res) {
    var ubicacion = new UbicacionModel({
      nombre: req.body.nombre,
      createdAt: req.body.createdAt,
    });

    ubicacion.save(function (err, ubicacion) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating ubicacion',
          error: err,
        });
      }

      return res.status(201).json(ubicacion);
    });
  },

  /**
   * ubicacionController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    UbicacionModel.findOne({ _id: id }, function (err, ubicacion) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting ubicacion',
          error: err,
        });
      }

      if (!ubicacion) {
        return res.status(404).json({
          message: 'No such ubicacion',
        });
      }

      ubicacion.nombre = req.body.nombre ? req.body.nombre : ubicacion.nombre;
      ubicacion.createdAt = req.body.createdAt ? req.body.createdAt : ubicacion.createdAt;

      ubicacion.save(function (err, ubicacion) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating ubicacion.',
            error: err,
          });
        }

        return res.json(ubicacion);
      });
    });
  },

  /**
   * ubicacionController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    UbicacionModel.findByIdAndRemove(id, function (err, ubicacion) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the ubicacion.',
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
