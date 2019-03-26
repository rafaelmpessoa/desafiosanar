const logger = require('../startup/logger')
const { Customer, validate, validateNewCreditCard } = require('../models/customer')
const axios = require('axios')
const auth = require('../config/auth')

if (process.env.NODE_ENV === 'development') require('dotenv').config()
const API_URL = process.env.URL_API

exports.postCustomer = async (req, res) => {
    let customer = req.body

    //validar obj post
    const { error } = validate(customer)
    if (error) return res.status(400).send(error.details[0].message)
    //criar objCustomer formato MundiPagg
    const customerMP = {
        name: customer.name,
        email: customer.email,
        type: customer.type
    }

    //Criar usuário no MundiPagg
    axios
        .post(`${API_URL}/customers`, customerMP, { auth })
        .then(obj => {
            //obtém identificador no MundiPagg para inserir no Mongo como referêcia
            customer._idCustomerMP = obj.data.id
            //Após criar Cliente, cria-se o cartão de cliente no MundiPagg
            axios
            .post(`${API_URL}/customers/${customer._idCustomerMP}/cards`,customer.creditCard[0],{auth})
            .then(async objRes => {
                //obtém o id de cartão no MundiPagg para inserir como referência
                const idCardMP = objRes.data.id
                customer.creditCard[0]._idCardMP = idCardMP
                customer = new Customer(customer)
                
                try {
                    //criar Cliente no Mongo
                    const newCustomer = await customer.save()
                    return res.status(200).send(newCustomer)
                } catch (e) {
                    logger.error(e.message)
                    return res.status(400).send(e.message)
                }
            }).catch(e => {
                logger.error(e.message)
                return res.status(400).send(e.message)
            })
        }).catch(e => {
            logger.error(e.message)
            return res.status(400).send(e.message)
        })


};

exports.insertNewCreditCard = async (req, res) => {
    let _idCustomer = req.params.id
    let customer = req.body

    //validar o body
    const { error } = validateNewCreditCard(customer)
    if (error) return res.status(400).send(error.details[0].message)

    try {
        //buscar o cliente na base
        let objCustomer = await Customer.findById(_idCustomer)

        //caso não exista esse Cliente
        if (!objCustomer) return res.status(400).send('Customere não encontrado')

        //definir todos os cartões como não usados
        const arrayOfCreditCard = objCustomer.creditCard.map(e => {
            return { number: e.number, ccv: e.ccv, inUse: false, holder_name: e.holder_name, exp_month: e.exp_month, exp_year: e.exp_year }
        })

        //criar novo cartão como em uso.
        const newCreditCard = { number: customer.number, ccv: customer.ccv, inUse: true, holder_name: customer.holder_name, exp_month: customer.exp_month, exp_year: customer.exp_year }
        

        //registrar cartão no MundiPagg
        axios
            .post(`${API_URL}/customers/${objCustomer._idCustomerMP}/cards`,newCreditCard,{auth})
            .then(async objRes => {
                const idCardMP = objRes.data.id
                newCreditCard._idCardMP = idCardMP
                arrayOfCreditCard.push(newCreditCard)
                //atualizar o mongo com o novo cartão e marcar todos os outros como em 'não uso'
                const updatedCustomer = await Customer.updateOne({ _id: _idCustomer }, { creditCard: [...arrayOfCreditCard] })
                return res.status(200).send(updatedCustomer)
            }).catch(e => {
                logger.error(e.message)
                return res.status(400).send(e.message)
            })
    } catch (e) {
        logger.error(e.message)
        return res.status(400).send(e.message)
    }

}


exports.getAllCustomers = async (req, res) => {
    //Obter todos os ususários no mongo
    try {
        const customers = await Customer.find()
        return res.status(200).send(customers)
    } catch (e) {
        logger.error(e.message)
        return res.status(400).send(e.message)
    }


}
