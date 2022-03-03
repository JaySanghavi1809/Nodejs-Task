const manufactureController = require("../controllers/manufactures.controller");
const checkAuthMiddleware = require('../middleware');

module.exports = function (app) {


    app.post("/api/manufacture/create",
    [
        checkAuthMiddleware.authJwt.verifyToken
    ]
    ,
    manufactureController.create);

    app.get('/api/manufacture/index', manufactureController.index);

    app.get('/api/manufactures/:id', manufactureController.show);

    app.put('/api/manufactures/:id',
    [
        checkAuthMiddleware.authJwt.verifyToken 
    ]
    ,
    manufactureController.update);

    app.delete('/api/manufactures/:id',
    [
        checkAuthMiddleware.authJwt.verifyToken
    ],
    
    manufactureController.destroy);
   
};


