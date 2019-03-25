const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');
const auth = require('../middleware/auth') 

//Obter todos os clientes cadastrados
router.get('/',auth,customerController.getAllCustomers)


//Criar um novo cliente 
router.post('/', auth, customerController.postCustomer);

//Inserir um novo cartão de cobrança
router.put('/newCreditCard/:id', auth, customerController.insertNewCreditCard);




module.exports = router;
