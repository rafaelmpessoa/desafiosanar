const express = require('express');
const subscriptionController = require('../controllers/subscription');
const isAuth = require('../middleware/auth');

const router = express.Router();

// alterar cartão do cobrança da subscription
router.patch('/changeCreditCard', isAuth, subscriptionController.patchChangeCreditCard);


module.exports = router;