const UserInfoController = require("../controllers/userInfo.controller");
const checkAuthMiddleware = require('../middleware');

module.exports = function (app) {


    // Create a new Item
    app.post("/api/users/create",
        [
            checkAuthMiddleware.authJwt.verifyToken
        ]
        ,
        UserInfoController.create);

    app.get('/api/users/all',
    [
        checkAuthMiddleware.authJwt.verifyToken,
        checkAuthMiddleware.verifySignUp.checkRolesExisted
    ],
  
    
    
    UserInfoController.retrieveAllUser);

    app.get('/api/users/onebyid/:id', UserInfoController.getUserById);
 
    app.put('/api/user/update/:id',
        [
            checkAuthMiddleware.authJwt.verifyToken
        ]
        ,
        UserInfoController.updateById);
        
    app.delete('/api/user/delete/:id',
        [
            checkAuthMiddleware.authJwt.verifyToken
        ]
        ,
        UserInfoController.deleteById);

};



