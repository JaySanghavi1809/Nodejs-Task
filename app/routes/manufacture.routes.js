const ManufactureController = require("../controllers/manufactures.controller");
const checkAuthMiddleware = require('../middleware');

module.exports = function (app) {


    // Create a new Item
    app.post("/api/manufactures/create",
        [
            checkAuthMiddleware.authJwt.verifyToken
        ]
        ,
        ManufactureController.create);

    app.get('/api/manufactures/all', ManufactureController.retrieveAllManufacture);

    app.get('/api/manufactures/onebyid/:id', ManufactureController.getManufactureById);
 
    app.put('/api/manufacture/update/:id',
        [
            checkAuthMiddleware.authJwt.verifyToken
        ]
        ,
        ManufactureController.updateById);
        
    app.delete('/api/manufacture/delete/:id',
        [
            checkAuthMiddleware.authJwt.verifyToken
        ]
        ,
        ManufactureController.deleteById);

};



