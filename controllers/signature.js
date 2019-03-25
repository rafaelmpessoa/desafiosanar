const axios = require('axios');
const { Signature, validate } = require('../models/signature');
const { Plan } = require('../models/plan');
const { Customer } = require('../models/customer')
const logger = require('../startup/logger')
const auth = require('../config/auth') //autenticação no MP

if (process.env.NODE_ENV = 'development') require('dotenv').config()
const URL_API = process.env.URL_API


exports.postSignatureWithPlan = async (req, res) => {
    const _idPlanMP = req.body._idPlanMP
    const _idCustomerMP = req.body._idCustomerMP
    const signature = req.body
    try {
        const plan = await Plan.findOne({ _idPlanMP })
        if (!plan) return res.status(400).send(`Plano ${_idPlanMP} não cadastrado.`)

        const costumer = await Customer.findOne({ _idCustomerMP })
        if (!costumer) return res.status(400).send(`Cliente ${_idCustomerMP} não cadastrado.`)

        //obter o cartão de credito ativo do cliente
        const creditCard = costumer.getValidCreditCard()
        signature.card = creditCard

        const { error } = validate(signature)
        if (error) return res.status(400).send(error.details[0].message)
        //Criar obj Signature para MultiPag
        const objSignatureMP = {
            plan_id: signature._idPlanMP,
            payment_method: signature.payment_method,
            customer_id: signature._idCustomerMP,
            card: signature.card
        }
        axios
            .post(`${URL_API}/subscriptions`, objSignatureMP, { auth })
            .then(async objres => {
                const id = objres.data.id
                signature._idSignatureMP = id
                const newSignature = new Signature(signature)

                try{
                    //validar se existe essa assinatura
                    // const signature = Signature.findOne({_idSignatureMP:id})
                    // if(signature) return res.status(400).send('Essa assinatura já existe.')

                    const insertedSignature = await newSignature.save()
                    return res.status(200).send(insertedSignature)

                }catch(e) {
                    logger.error(e.message)
                    return res.status(400).send(e.message)
                }
            }).catch(e => {
                logger.error(e)
                return res.status(400).send(e.message)
            })
    } catch (e) {
        logger.error(e.message)
        return res.status(400).send(e.message)
    }
}


exports.deleteCancelSignature = async (req, res) => {
    const pathSubscriptionId = req.params._idSubMP
    try {
        const subscription = await Signature.findOne({_idSignatureMP:pathSubscriptionId})
        if(!subscription) return res.status(200).send('Assinatura não encontrada.')

        axios
            .delete(`${URL_API}/subscriptions/${pathSubscriptionId}`,{auth})
            .then(async objRes => {
                try {
                    const removedSub = await Signature.findOneAndDelete({_idSignatureMP:pathSubscriptionId})
                    return res.status(200).send(removedSub)
                }catch(e){
                    logger.error(e.message)
                    return res.status(400).send(e.message)
                }

            }).catch(e => {
                logger.error(e.message)
                return res.status(400).send(e.message)
            })
        
    }catch(e) {
        logger.error(e.message)
        return res.status(400).send(e.message)
    }
}

exports.getAllSignature = async(req,res) => {

    try {
        const signature = await Signature.find()
        return res.status(200).send(signature)

    }catch(e){
        logger.message(e.message)
        return res.status(400).send(e.message)
    }
    
}