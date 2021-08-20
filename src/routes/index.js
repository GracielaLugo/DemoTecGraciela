const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const asignaturaRoute = require('./asignatura.route');
const carreraRoute = require('./carrera.route');
const grupoRoute = require('./grupo.route');
const horarioRoute = require('./horarios.route');
const maestroRoute = require('./maestro.route');
const ubicacionRoute = require('./ubicacion.route');
const alexaRoute = require('./alexa.route');

const config = require('../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/asignaturas',
    route: asignaturaRoute,
  },
  {
    path: '/carreras',
    route: carreraRoute,
  },
  {
    path: '/grupos',
    route: grupoRoute,
  },
  {
    path: '/horarios',
    route: horarioRoute,
  },
  {
    path: '/maestros',
    route: maestroRoute,
  },
  {
    path: '/ubicaciones',
    route: ubicacionRoute,
  },
  {
    path: '/alexa',
    route: alexaRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
