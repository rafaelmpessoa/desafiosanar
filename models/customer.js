const mongoose = require('mongoose');
const Joi = require('joi')
Joi.objectId  = require('joi-objectid')(Joi)

//modelo de Cliente
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        default: 'individual'
    },
    //os cartão de creditos são todos inseridos no mongo, mesmo com inserçaõ de novos, mantendo apenas 1 em inUse:true
    creditCard: [
        {
            number: {
                type: String,
                required: true
            },
            cvv: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 3
            },
            inUse: {
                type: Boolean,
                default: true
            },
            holder_name: {
                type: String,
                required: true
            },
            exp_month: {
                type: Number,
                required: true
            },
            exp_year: {
                type: Number,
                required:true
            },
            //codigo de ref no MundiPagg
            _idCardMP: {
                type:String,
                required: true
            }
        }
    ],
    //codigo de referencia o cliente no MundiPagg
    _idCustomerMP:{
        type:String,
        required: true,
        unique:true
    }

});


//Obter o cartão de credito valido.
customerSchema.methods.getValidCreditCard = function() {
    const validCreditCard = this.creditCard.filter(e => e.inUse)
    //remover o objeto CoreMongooseArray
    let formatedCreditCard =  JSON.stringify(validCreditCard[0])
    return JSON.parse(formatedCreditCard)
}

//função para validar se o Body está correto
function validateCustomer(customer) {
    const schema = {
        name: Joi.string().required(),
        creditCard: Joi.array().items({
            number: Joi.string().required(),
            cvv: Joi.string().required().min(3).max(3),
            holder_name: Joi.string().required(),
            exp_month: Joi.number().required(),
            exp_year: Joi.number().required()
        }),
        email: Joi.string().required()
    }

    return Joi.validate(customer,schema)
}

//função para validar se os atributos do cartão de creditos foram passados.
function validateNewCreditCard(customerCreditCard) {
    const schema = {
        number: Joi.string().required(),
        cvv: Joi.string().required().min(3).max(3),
        holder_name: Joi.string().required(),
        exp_month: Joi.number().required(),
        exp_year: Joi.number().required()

    }

    return Joi.validate(customerCreditCard,schema)
}

module.exports = {
    Customer: mongoose.model('Customer', customerSchema),
    validate: validateCustomer,
    validateNewCreditCard
}
