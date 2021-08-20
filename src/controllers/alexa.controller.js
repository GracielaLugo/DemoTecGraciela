const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, tokenService } = require('../services');
const { Horarios } = require('../models');

//ALEXA LINK
const alexaLink = catchAsync(async (req, res) => {
  const { redirect_uri, state, scope, client_id } = req.query;

  // res.redirect(httpStatus.NO_CONTENT).send();
  const access_token = await tokenService.generateAuthTokens(req.user, true);
  console.log('access_token', access_token.access.token);
  console.log('client_id', client_id);
  const redirectURL = `${redirect_uri}&token_type=Bearer&state=${state}&access_token=${access_token.access.token}`;

  res.status(200).send({ redirectURL, access_token });
});

const alexaProfile = catchAsync(async (req, res) => {
  //usuario inyectado en middleware
  const user = req.user;
  res.status(200).send({ user });
});

const obtenerHorarios = catchAsync(async (req, res) => {
  const userId = req.userId;
  console.log('userId', userId);

  const horariosByMaestro = await Horarios.find({ maestroId: userId })
    .populate('maestroId')
    .populate('asignaturaId')
    .populate('grupoId')
    .populate('ubicacionId');

  res.status(200).send(horariosByMaestro);
});

module.exports = {
  alexaLink,
  alexaProfile,
  obtenerHorarios,
};
