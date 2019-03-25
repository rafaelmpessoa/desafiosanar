const bodyParser = require('body-parser');
const cors = require('cors')

const signature = require('../routes/signature');
const subscription = require('../routes/subscription');
const plan = require('../routes/plan');
const login = require('../routes/login');
const customer = require('../routes/customer');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(cors());
    app.use(error);
    // Rotas
    app.use('/api/signature', signature);
    app.use('/api/subscriptions', subscription);
    app.use('/api/plan', plan);
    app.use('/api/login', login);
    app.use('/api/customer', customer);
}
