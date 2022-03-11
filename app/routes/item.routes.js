const ItemController = require("../controllers/items.controller");
const checkAuthMiddleware = require('../middleware');

module.exports = function (app) {


    // Create a new Item
    app.post("/api/items/create",
        [
            checkAuthMiddleware.authJwt.verifyToken,
            checkAuthMiddleware.authJwt.ItemRecord(["Admin","Manufacturer"])
        ]
        ,
        ItemController.create);

    app.get('/api/items/all', 
    [
        checkAuthMiddleware.authJwt.verifyToken,
        checkAuthMiddleware.authJwt.ProductInfo(["Manufacturer"])
    ],
    
    ItemController.retrieveAllItems);

    

    app.get('/api/items/onebyid/:id', ItemController.getItemById);

    app.get('/api/items/filteringByPrice', ItemController.filteringByPrice);

    app.get('/api/items/pagination', ItemController.pagination);

    app.get('/api/items/pagefiltersort', ItemController.pagingfilteringsorting);

    app.put('/api/items/update/:id',
        [
            checkAuthMiddleware.authJwt.verifyToken,
            checkAuthMiddleware.authJwt.UpdateItem(["Admin","Manufacturer"])
        ]
        ,
        ItemController.updateById);

    app.delete('/api/items/delete/:id',
        [
            checkAuthMiddleware.authJwt.verifyToken,
            checkAuthMiddleware.authJwt.DeleteItems(["Admin"])
        ]
        ,
        ItemController.deleteById);

};



