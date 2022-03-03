const viewMyOrders = require('../controllers/orders.controller')
const checkAuthMiddleware = require('../middleware')

module.exports = function (app) {

    app.get("/api/viewOrder/viewAll", 
    [
        checkAuthMiddleware.authJwt.verifyToken
    ],
    
    viewMyOrders.findAll);

    // Retrieve a single Item by Id
    app.get("/api/viewOrder/:orderId",
    [
        checkAuthMiddleware.authJwt.verifyToken
    ],
    
    viewMyOrders.findByPk);

    // Update a item with Id
    app.put("/api/viewOrder/:orderId",
        [
            checkAuthMiddleware.authJwt.verifyToken
        ],
        viewMyOrders.update);

    // Delete a item with Id
    app.delete("/api/viewOrder/:orderId",
        [
            checkAuthMiddleware.authJwt.verifyToken
        ],
        viewMyOrders.delete);
};