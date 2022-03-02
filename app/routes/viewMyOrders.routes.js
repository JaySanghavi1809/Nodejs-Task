const ViewOrderController = require("../controllers/ViewOrder.controller");
const checkAuthMiddleware = require('../middleware');

module.exports = function (app) {


    // Create a new Item
    app.post("/api/viewOrder",
        [
            checkAuthMiddleware.authJwt.verifyToken
        ]

        ,
        OrderController.create);

    // Retrieve all item
    app.get("/api/viewOrdersAll", OrderController.findAll);

 
};
