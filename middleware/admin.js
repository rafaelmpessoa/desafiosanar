const logger = require('../startup/logger')

//middleware que garente privilegios
module.exports = function (req, res, next) { 
    if (!req.user.isAdmin) {
      logger.warn(`ADMIN - User: ${req.user._id} Acesso negado. `)
      return res.status(403).send('Acesso negado.');
    }
    
    next();
  }