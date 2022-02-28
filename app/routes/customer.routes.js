const customerController = require("../controllers/customer.controller");
const checkAuthMiddleware = require('../middleware');

module.exports = function (app) {
 
    app.post('/api/customers/create', customerController.create);
    app.get('/api/customers/pagefiltersort', customerController.pagingfilteringsorting);
    app.get('/api/customers/salaries', customerController.getSalaries);
}