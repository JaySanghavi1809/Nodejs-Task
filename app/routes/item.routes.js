const ItemController = require("../controllers/items.controller");
const checkAuthMiddleware = require('../middleware');

module.exports = function (app) {


    // Create a new Item
    app.post("/api/item",
    [
        checkAuthMiddleware.authJwt.verifyToken
    ]
    ,
    ItemController.create);

    // Retrieve all item
    app.get("/api/items", ItemController.findAll);

    // Retrieve a single Item by Id
    app.get("/api/items/:itemId", ItemController.findByPk);

    // Update a item with Id
    app.put("/api/items/:itemId",
    [
        checkAuthMiddleware.authJwt.verifyToken 
    ],
    ItemController.update);

    // Delete a item with Id
    app.delete("/api/items/:itemId",
    [
        checkAuthMiddleware.authJwt.verifyToken
    ],
    ItemController.delete);
};
