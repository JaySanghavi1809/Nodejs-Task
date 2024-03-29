const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);



  app.get(
    "/api/test/customer",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.CustomerBoard
  );

  app.get(
    "/api/test/manufacturer",
    [authJwt.verifyToken, authJwt.isManufacturer],
    controller.manufacturerBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};