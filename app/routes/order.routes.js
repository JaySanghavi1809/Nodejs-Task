const OrderController = require("../controllers/orders.controller");
const checkAuthMiddleware = require('../middleware');

module.exports = function (app) {


    // Create a new Item
    app.post("/api/orders/create",
        [
            checkAuthMiddleware.authJwt.verifyToken,
            // checkAuthMiddleware.authJwt.ItemDate(["Customer"]),
        ]
        ,
        OrderController.create);
    app.get('/api/orders/all',
    [
        checkAuthMiddleware.authJwt.verifyToken,
        checkAuthMiddleware.authJwt.OrderPage(["Admin"]),
        
    ],
    OrderController.retrieveAllOrder);

    app.get('/api/orders/onebyid/:id', OrderController.getOrderById);

    app.get('/api/orders/filteringBystatus', OrderController.filteringByStatus);

    app.get('/api/orders/pagination', OrderController.pagination);

    app.get('/api/orders/pagefiltersort', OrderController.pagingfilteringsorting);

    app.put('/api/order/update/:id',
        [
            checkAuthMiddleware.authJwt.verifyToken,
            checkAuthMiddleware.authJwt.updateORDER(["Admin","Manufacture"])
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



