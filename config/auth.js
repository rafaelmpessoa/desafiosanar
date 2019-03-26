

//obj de autenticação no mundiPagg, feito como modulo para ser reaproveitado em todo sistema
if(process.env.NODE_ENV === 'development') require('dotenv').config()
const auth = {
    username: process.env.SECRET_KEY
}

module.exports = auth