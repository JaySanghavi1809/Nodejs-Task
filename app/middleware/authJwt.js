const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");


const User = db.user;
const Role = db.role;
const Order = db.order


authPage =  (permissions) => {
  return async(req, res, next) => {
      const userId = req.userId
      console.log(userId)

      var userDetails = await User.findOne({where: {id: req.userId}})
     
      console.log(userDetails)
      if (permissions.includes(userDetails.role)) {
          next()
      } else {
          return res.status(401).json("You dont have permission!")
      }
  }
}

ordersRecord =  (permissions) => {
  return async(req, res, next) => {
      const orderId = req.orderId
      console.log(orderId)

      var OrderDetails = await User.findOne({})
     
      console.log(OrderDetails)
      if (permissions.includes(OrderDetails.role)) {
          next()
      } else {
          return res.status(401).json("You dont have permission!")
      }
  }
}


verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isCustomer = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(role => {
      for (let i = 0; i < roles.length; i++) {
        if (role[i].name === "customer") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Customer Role!"
      });
      return;
    });
  });
};



isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(role => {
      for (let i = 0; i < role.length; i++) {
        if (role[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isManufacturer = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(role => {
      for (let i = 0; i < role.length; i++) {
        if (role[i].name === "manufacturer") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Manufacturer Role!"
      });
    });
  });
};

isManufacturerOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(role => {
      for (let i = 0; i < role.length; i++) {
        if (role[i].name === "manufacturer") {
          next();
          return;
        }

        if (role[i].name === "admin") {

          next();
          return;
        }

        if (role[i].name === "customer") {
          next();
          return;
        }

      }

      res.status(403).send({
        message: "Require Manufacturer or Admin or customer Role!"
      });
    });
  });
};


const authJwt = {

  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isManufacturer: isManufacturer,
  isCustomer:isCustomer,
  authPage:authPage,
  ordersRecord:ordersRecord,
  isManufacturerOrAdmin: isManufacturerOrAdmin,
  
  

};
module.exports = authJwt;