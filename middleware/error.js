const logger = require('../startup/logger');

//middleware para tratar erros não esperados
module.exports = function(err, req, res, next){
  logger.error(err.message, err);
  res.status(500).send('Something failed.');
}