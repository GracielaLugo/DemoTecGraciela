var express = require('express');
var router = express.Router();
var carreraController = require('../controllers/carrera.controller.js');

/*
 * GET
 */
router.get('/', carreraController.list);

/*
 * GET
 */
router.get('/:id', carreraController.show);

/*
 * POST
 */
router.post('/', carreraController.create);

/*
 * PUT
 */
router.put('/:id', carreraController.update);

/*
 * DELETE
 */
router.delete('/:id', carreraController.remove);

module.exports = router;
