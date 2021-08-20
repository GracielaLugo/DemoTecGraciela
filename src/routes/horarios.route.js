var express = require('express');
var router = express.Router();
var horariosController = require('../controllers/horarios.controller.js');

/*
 * GET
 */
router.get('/', horariosController.list);

/*
 * GET
 */
router.get('/:id', horariosController.show);

/*
 * POST
 */
router.post('/', horariosController.create);

/*
 * PUT
 */
router.put('/:id', horariosController.update);

/*
 * DELETE
 */
router.delete('/:id', horariosController.remove);

module.exports = router;
