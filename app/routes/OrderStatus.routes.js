const OrderStatusController = require("../controllers/OrderStatus.controller");
const checkAuthMiddleware = require('../middleware');

module.exports = function (app) {


    // Create a new Item
    app.post("/api/orders/create",
        [
            checkAuthMiddleware.authJwt.verifyToken,
            // checkAuthMiddleware.authJwt.ExpireDate(["Customer"]),
            //  checkAuthMiddleware.authJwt.CreateOrder(["Customer"]),
        ]
        ,
        OrderStatusController.create);
    app.get('/api/orders/all',
    [
        checkAuthMiddleware.authJwt.verifyToken,
        checkAuthMiddleware.authJwt.OrderPage(["Admin"]),
        
    ],
    OrderStatusController.retrieveAllOrder);

    app.get('/api/orders/onebyid/:id', OrderStatusController.get_Order_DetailsById);

    app.get('/api/orders/filteringBystatus', OrderStatusController.filteringByStatus);

    app.get('/api/orders/pagination', OrderStatusController.pagination);

    app.get('/api/orders/pagefiltersort', OrderStatusController.pagingfilteringsorting);

    app.put('/api/order/update/:id',
    [
        checkAuthMiddleware.authJwt.verifyToken,
        checkAuthMiddleware.authJwt.UpdateOrder(["Admin","Manufacturer"]),
        checkAuthMiddleware.authJwt.UpdateOrderByCustomer(["Customer"])
    ]
        ,
        OrderStatusController.updateById);

    app.delete('/api/order/delete/:id',
        [
            checkAuthMiddleware.authJwt.verifyToken
        ]
        ,
        OrderStatusController.deleteById);

};



