const mongoose = require('mongoose')
const logger = require('./logger')

if(process.env.NODE_ENV = 'development') require('dotenv').config()
const DB_URI = process.env.SANAR_DB

const options = {
    useNewUrlParser: true
}

//função que retorna a instancia do bando de dados
module.exports = function (){
    if(!DB_URI) {
        logger.error('é preciso definir o DB_URI')
        }else{
            return mongoose.connect(DB_URI,options)
                .then(logger.info('Database connected!'))
                .catch((e)=>logger.error(`DB - Error database connect: ${e.message}`))
        }    
} 
