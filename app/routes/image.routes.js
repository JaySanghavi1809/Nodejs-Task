const checkAuthMiddleware = require('../middleware');
const ImagesController = require("../controllers/file.controller");

module.exports = function (app) {
  app.post("/api/upload",
  [
    checkAuthMiddleware.authJwt.verifyToken
  ]
  ,
  ImagesController.upload);

  app.get("/api/files", ImagesController.download);
  app.get("/api/files/:name", ImagesController.getListFiles);

};



