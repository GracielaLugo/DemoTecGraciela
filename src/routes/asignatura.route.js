var express = require('express');
var router = express.Router();
var asignaturaController = require('../controllers/asignatura.controller.js');

/*
 * GET
 */
router.get('/', asignaturaController.list);

/*
 * GET
 */
router.get('/:id', asignaturaController.show);

/*
 * POST
 */
router.post('/', asignaturaController.create);

/*
 * PUT
 */
router.put('/:id', asignaturaController.update);

/*
 * DELETE
 */
router.delete('/:id', asignaturaController.remove);

module.exports = router;
