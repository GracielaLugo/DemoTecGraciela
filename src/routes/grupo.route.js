var express = require('express');
var router = express.Router();
var grupoController = require('../controllers/grupo.controller.js');

/*
 * GET
 */
router.get('/', grupoController.list);

/*
 * GET
 */
router.get('/:id', grupoController.show);

/*
 * POST
 */
router.post('/', grupoController.create);

/*
 * PUT
 */
router.put('/:id', grupoController.update);

/*
 * DELETE
 */
router.delete('/:id', grupoController.remove);

module.exports = router;
