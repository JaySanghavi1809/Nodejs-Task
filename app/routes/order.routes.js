const OrderController = require("../controllers/orders.controller");
const checkAuthMiddleware = require('../middleware');

module.exports = function (app) {


    // Create a new Item
    app.post("/api/order",
        [
            checkAuthMiddleware.authJwt.verifyToken
        ]

        ,
        OrderController.create);

    // Retrieve all item
    app.get("/api/orders", OrderController.findAll);

    // Retrieve a single Item by Id
    app.get("/api/orders/:orderId", OrderController.findByPk);

    app.get('/api/orders/filteringByStatus', OrderController.filteringByStatus);

    // Update a item with Id
    app.put("/api/orders/:orderId",
        [
            checkAuthMiddleware.authJwt.verifyToken
        ],
        OrderController.update);

    // Delete a item with Id
    app.delete("/api/orders/:orderId",
        [
            checkAuthMiddleware.authJwt.verifyToken
        ],
        OrderController.delete);
};