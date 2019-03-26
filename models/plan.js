const mongoose = require('mongoose');
const Joi = require('joi')

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    //id de referencia no MundiPagg
    _idPlanMP: {
        type: String,
        required: true
    }
});

//função para validar o body
function validateMPlan(plan) {
    const schema = {
        name: Joi.string().required(),
        items: Joi.array().items({
            name: Joi.string().required(),
            quantity: Joi.number().required(),
            pricing_scheme: Joi.object().keys({
                price: Joi.number().required()
            }).required()
        }).required(),
        interval: Joi.string().required(),
        interval_count: Joi.number().required(),
        minimum_price: Joi.number().required(),
        trial_period_days: Joi.number().required(),
        metadata: Joi.object()
    }

    return Joi.validate(plan, schema)

}



module.exports = {
    Plan: mongoose.model('plan', planSchema),
    validateMPlan
} 
