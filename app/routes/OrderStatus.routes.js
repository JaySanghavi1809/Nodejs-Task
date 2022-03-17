const OrderStatusController = require("../controllers/OrderStatus.controller");
const checkAuthMiddleware = require('../middleware');

module.exports = function (app) {


    // Create a new Item

    app.get('/api/orders/filteringBystatus', OrderStatusController.filteringByStatus);

    app.put('/api/order/update/:id',
        [
            checkAuthMiddleware.authJwt.verifyToken,
            // checkAuthMiddleware.authJwt.UpdateOrder(["Admin","Manufacturer"]),
            // checkAuthMiddleware.authJwt.UpdateOrderByCustomer(["Customer"])
        ]
        ,
        OrderStatusController.updateOrderStatus);



};



