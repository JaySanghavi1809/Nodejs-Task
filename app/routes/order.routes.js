const OrderController = require("../controllers/orders.controller");
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
        OrderController.create);
    app.get('/api/orders/all',
    [
        checkAuthMiddleware.authJwt.verifyToken,
        checkAuthMiddleware.authJwt.OrderPage(["Admin"]),
        
    ],
    OrderController.retrieveAllOrder);

    app.get('/api/orders/onebyid/:id', OrderController.get_Order_DetailsById);

    app.get('/api/orders/filteringBystatus', OrderController.filteringByStatus);

    app.get('/api/orders/pagination', OrderController.pagination);

    app.get('/api/orders/pagefiltersort', OrderController.pagingfilteringsorting);

    app.put('/api/order/update/:id',
    [
        checkAuthMiddleware.authJwt.verifyToken,
        checkAuthMiddleware.authJwt.UpdateOrder(["Admin","Manufacturer"]),
        // checkAuthMiddleware.authJwt.UpdateOrderByCustomer(["Customer"])
    ]
        ,
        OrderController.updateById);

    app.delete('/api/order/delete/:id',
        [
            checkAuthMiddleware.authJwt.verifyToken
        ]
        ,
        OrderController.deleteById);

};



