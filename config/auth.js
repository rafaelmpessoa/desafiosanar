

if(process.env.NODE_ENV === 'development') require('dotenv').config()
const auth = {
    username: process.env.SECRET_KEY
}

module.exports = auth