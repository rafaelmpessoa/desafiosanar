const jwt = require('jsonwebtoken');
const logger = require('../startup/logger')

if(process.env.NODE_ENV = 'development') require('dotenv').config()
const privateKey = process.env.JWT_PRIVATE_KEY

exports.login = (req, res) => {
    //metodo de autenciatacao , retorna um token de autorização para o consumo das apis, 
    //criação do token, adicionar atributos a no token
    try{
        const token = jwt.sign({},privateKey,{expiresIn:60 * 120})
        const isValid = jwt.verify(token,privateKey)
        if(isValid) {
            return res.status(200).send({token})
        }else{
            logger.warn(`{message: invalid login, obj: ${req.header}}`)
            return res.status(401).send('invalid Login.')
        }
    }catch(e) {
        logger.error(`obj:${e.message}`)
        return res.status(400).send(e.message)
    }


};
