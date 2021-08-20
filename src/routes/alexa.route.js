const express = require('express');
const { auth, authAuth0 } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const alexaValidation = require('../validations/alexa.validation');
const alexaController = require('../controllers/alexa.controller');

const router = express.Router();

router.post('/link', auth(), validate(alexaValidation.alexaLink), alexaController.alexaLink);
router.get('/profile', authAuth0, alexaController.alexaProfile);

router.get('/horarios', authAuth0, alexaController.obtenerHorarios);

module.exports = router;
