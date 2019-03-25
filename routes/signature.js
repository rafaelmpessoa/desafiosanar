const express = require('express');
const signatureController = require('../controllers/signature');
const isAuth = require('../middleware/auth');

const router = express.Router();

//REGISTRAR NOVA ASSINATURA 
router.post('/', isAuth, signatureController.postSignatureWithPlan);

// DELETE /signature/cancelar
router.delete('/cancelar/:_idSubMP', isAuth, signatureController.deleteCancelSignature);

//get all signature
router.get('/',isAuth,signatureController.getAllSignature)

module.exports = router;