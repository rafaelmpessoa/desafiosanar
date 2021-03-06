const axios = require('axios');
const {Plan ,validateMPlan} = require('../models/plan');
const auth = require('../config/auth')
const logger = require('../startup/logger')

if(process.env.NODE_ENV === 'development') require('dotenv').config()
const URL_API = process.env.URL_API

exports.postPlan = async (req, res) => {
    //criar novo plano
    const plan = req.body
    //validar o body
    const {error} = validateMPlan(plan)
    if(error) return res.status(400).send(error.details[0].message)
    //inserir o plano no MundiPagg
    axios
        .post(`${URL_API}/plans`,plan,{auth})
        .then(async objres => {
            let newPlan = {
                name: objres.data.name,
                _idPlanMP: objres.data.id
            }
            //obtém o codigo de referencia no MundiPagg e cria obj para ser inserido no mongo

            newPlan = new Plan(newPlan)

            try {
                //inserção no mongo
                const insertedPlan = await newPlan.save()
                return res.status(200).send(insertedPlan)

            }catch(e) {
                logger.error(e.message)
                return res.status(400).send(e.message)
            }
        }).catch(e=> {
            logger.error(e.message)
            return res.status(400).send(e.message)
        })

}


exports.getAllPlans = async(req,res) => {
    //obter todos os planos
    try{
        const plans = await Plan.find()
        return res.status(200).send(plans)
    }catch(e) {
        logger.error(e.message)
        return res.status(400).send(e.message)
    }
}