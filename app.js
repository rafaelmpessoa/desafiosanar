const express = require('express')
const app = express()
const logger = require('./startup/logger')

//inicar as rotas e os middleware
require('./startup/router')(app);
//conectar com o banco de dadosss
require('./startup/db')();

const port = process.env.PORT || 3000
app.listen(port,() => logger.info(`Server listening on port ${port}...`))