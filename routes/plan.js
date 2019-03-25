const express = require('express');
const planController = require('../controllers/plan');
const isAuth = require('../middleware/auth');

const router = express.Router();

// Criar um plano
router.post('/', isAuth, planController.postPlan);

//Obter todos os planos
router.get('/',isAuth,planController.getAllPlans)

module.exports = router;