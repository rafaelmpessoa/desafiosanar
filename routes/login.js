const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');


//login e obtém o token de auth
router.post('/', loginController.login);

module.exports = router;
