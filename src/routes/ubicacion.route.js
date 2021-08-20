var express = require('express');
var router = express.Router();
var ubicacionController = require('../controllers/ubicacion.controller.js');

/*
 * GET
 */
router.get('/', ubicacionController.list);

/*
 * GET
 */
router.get('/:id', ubicacionController.show);

/*
 * POST
 */
router.post('/', ubicacionController.create);

/*
 * PUT
 */
router.put('/:id', ubicacionController.update);

/*
 * DELETE
 */
router.delete('/:id', ubicacionController.remove);

module.exports = router;
