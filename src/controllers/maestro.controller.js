const httpStatus = require('http-status');
const { Maestro } = require('../models/index');
const { createUser } = require('../services/auth0.service');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

/**
 * maestro.controller.js
 *
 * @description :: Server-side logic for managing maestros.
 */
module.exports = {
  /**
   * maestroController.list()
   */
  list: function (req, res) {
    Maestro.find(function (err, maestros) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting maestro.',
          error: err,
        });
      }

      return res.json(maestros);
    });
  },

  /**
   * maestroController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    Maestro.findOne({ _id: id }, function (err, maestro) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting maestro.',
          error: err,
        });
      }

      if (!maestro) {
        return res.status(404).json({
          message: 'No such maestro',
        });
      }

      return res.json(maestro);
    });
  },

  /**
   * maestroController.create()
   */
  create: catchAsync(async (req, res) => {
    const userBody = req.body;

    if (await Maestro.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }

    const maestro = await Maestro.create({
      nombre: userBody.nombre,
      email: userBody.email,
      apellidoPaterno: userBody.apellidoPaterno,
      apellidoMaterno: userBody.apellidoMaterno,
      telefono: userBody.telefono,
    });
    console.log('maestro', maestro);

    const user = await createUser({ ...userBody, id: maestro._id });
    console.log('user', user);
    console.log('maestro', maestro);
    return res.status(201).json(maestro);
  }),

  /**
   * maestroController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    Maestro.findOne({ _id: id }, function (err, maestro) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting maestro',
          error: err,
        });
      }

      if (!maestro) {
        return res.status(404).json({
          message: 'No such maestro',
        });
      }

      maestro.nombre = req.body.nombre ? req.body.nombre : maestro.nombre;
      maestro.apellidoPaterno = req.body.apellidoPaterno ? req.body.apellidoPaterno : maestro.apellidoPaterno;
      maestro.apellidoMaterno = req.body.apellidoMaterno ? req.body.apellidoMaterno : maestro.apellidoMaterno;
      maestro.createdAt = req.body.createdAt ? req.body.createdAt : maestro.createdAt;

      maestro.save(function (err, maestro) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating maestro.',
            error: err,
          });
        }

        return res.json(maestro);
      });
    });
  },

  /**
   * maestroController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    Maestro.findByIdAndRemove(id, function (err, maestro) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the maestro.',
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
