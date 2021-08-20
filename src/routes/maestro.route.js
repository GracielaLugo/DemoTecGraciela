var express = require('express');
var router = express.Router();
var maestroController = require('../controllers/maestro.controller.js');

/*
 * GET
 */
router.get('/', maestroController.list);

/*
 * GET
 */
router.get('/:id', maestroController.show);

/*
 * POST
 */
router.post('/', maestroController.create);

/*
 * PUT
 */
router.put('/:id', maestroController.update);

/*
 * DELETE
 */
router.delete('/:id', maestroController.remove);

module.exports = router;
