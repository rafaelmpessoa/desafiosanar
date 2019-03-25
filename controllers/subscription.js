const axios = require('axios');
const { Signature, validateChangeCreditCard } = require('../models/signature');
const { Customer } = require('../models/customer')
const logger = require('../startup/logger')
const auth = require('../config/auth') //autenticação no MP

if (process.env.NODE_ENV = 'development') require('dotenv').config()
const URL_API = process.env.URL_API


exports.patchChangeCreditCard = async (req, res) => {

    const {error} = validateChangeCreditCard(req.body)
    if(error) return res.status(400).send(error.details[0].message)


    try {
        const signature = await Signature.findOne({_idSignatureMP:req.body.subscription_id})
        if(!signature) return res.status(400).send('Assinatura não existe.')

        const customer = await Customer.findById(signature._idCustomer)
        if(!customer) return res.status(400).send('Cliente não encontrado.')

        const validCreditCard = customer.getValidCreditCard()

        validCreditCard.card_id = validCreditCard._idCardMP
    
        axios.
            patch(`${URL_API}/subscriptions/${signature._idSignatureMP}/card`,validCreditCard,{auth})
            .then(objRes => {
                return res.status(200).send(objRes.data)
            }).catch(e => {
                logger.error(e.message)
                return res.status(400).send(e.message)
            })         
    }catch(e) {
        logger.error(e.message)
        return res.status(400).send(e.message)
    }
}
