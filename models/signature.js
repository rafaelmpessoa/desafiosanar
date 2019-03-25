const mongoose = require('mongoose');
const Joi = require('joi')
Joi.objectId  = require('joi-objectid')(Joi)

const Schema = mongoose.Schema;

const signatureSchema = new Schema({
    _idCustomer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    _idPlanMP: {
        type: String,
        required: true
    },
    _idPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
        required:true
    },
    _idCustomerMP: {
        type: String,
        required: true
    },
    payment_method: {
        type: String,
        required: true
    },
    card: {
        type: Object,
        required: true
    },
    _idSignatureMP: {
        type: String,
        required: true
    }

});

function validateSignature(signature) {
    const schema = {
        _idCustomer: Joi.objectId().required(),
        _idCustomerMP: Joi.string().required(),
        _idPlan: Joi.objectId().required(),
        _idPlanMP: Joi.string().required(),
        payment_method: Joi.string().required(),
        card: Joi.object().keys({
            holder_name: Joi.string().required(),
            number: Joi.string().required(),
            exp_month: Joi.number().required(),
            exp_year: Joi.number().required(),
            cvv: Joi.string().required(),
            inUse: Joi.boolean(),
            _id: Joi.objectId(),
            _idCardMP: Joi.string()
        }).required()
    }

    return Joi.validate(signature, schema)
}

function validateChangeCreditCard(signature) {
    const schema = {
        subscription_id: Joi.string().required()
    }

    return Joi.validate(signature,schema)
}

module.exports = {
    Signature: mongoose.model('Signature', signatureSchema),
    validate: validateSignature,
    validateChangeCreditCard
} 

