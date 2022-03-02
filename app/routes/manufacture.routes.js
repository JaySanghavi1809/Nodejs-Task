const manufactureController = require("../controllers/manufactures.controller");
const checkAuthMiddleware = require('../middleware');

module.exports = function (app) {


    // Create a new manufacture
    app.post("/api/manufacture",
    [
        checkAuthMiddleware.authJwt.verifyToken
    ]
    
    ,
    manufactureController.create);

    app.get("/api/manufacture/getAllBadges", manufactureController.getAllBadges);

    // Retrieve all item
    app.get("/api/manufactures", manufactureController.findAll);

    // Retrieve a single Item by Id
    app.get("/api/manufactures/:manufacture_Id", manufactureController.findByPk);

    // Update a item with Id
    app.put("/api/manufactures/:manufacture_Id",
    [
        checkAuthMiddleware.authJwt.verifyToken 
    ],
    manufactureController.update);

    // Delete a item with Id
    app.delete("/api/manufactures/:manufacture_Id",
    [
        checkAuthMiddleware.authJwt.verifyToken
    ],
    manufactureController.delete);

    
};