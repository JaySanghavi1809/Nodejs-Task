const { status } = require("express/lib/response");
const jwt = require("jsonwebtoken");


const config = require("../config/auth.config.js");
const db = require("../models");
const item = require("../models/item.js");
const User = db.user;
const Item = db.item;
const Role = db.role;
const Orders = db.order

const Manufacturer = db.manufacture;

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
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "customer") {
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
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
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
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "manufacturer") {
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
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "manufacturer") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }

        if (roles[i].name === "customer") {
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

authPage = (permission)  => {
  return async(req,res,next)=>{
    const userId = req.userId
    console.log(userId)

    var userDetails = await User.findOne({where: {id:userId} })

    console.log(userDetails)
    if(permission.includes(userDetails.role)){
      next()
    }else {
      return res.status(401).json("You dont have permission")
    }
  }
}

OrderPage = (permission)  => {
  return async(req,res,next)=>{
    const userId = req.userId
    console.log(userId)

    var userDetails = await User.findOne({where: {id:userId} })

    console.log(userDetails)
    if(permission.includes(userDetails.role)){
      next()
    }else {
      return res.status(401).json("You dont have permission")
    }
  }
}


ownOrder = (permission)  => {
  return async(req,res,next)=>{
    const userId = req.userId
    console.log(userId)

    var userDetails = await User.findOne({where: {id:userId} })

    console.log(userDetails)
    if(permission.includes(userDetails.role)){
      next()
    }else {
      return res.status(401).json("You dont have permission")
    }
  }
}

ProductInfo = (permission)  => {
  return async(req,res,next)=>{
    const userId = req.userId
    console.log(userId)
    
    var userDetails = await User.findOne({where: {id:userId} })
    console.log(userDetails)
    if(permission.includes(userDetails.role)){
      next()
    }else {
      return res.status(401).json("You dont have permission")
    }
  }
}

ItemRecord = (permission)  => {
  return async(req,res,next)=>{
    const userId = req.userId
    console.log(userId)
    
    var userDetails = await User.findOne({where: {id:userId} })
    console.log(userDetails)
    if(permission.includes(userDetails.role)){

      next()
    }else {
      return res.status(401).json("You dont have permission update and add record")
    }
  }
}

ItemRecord = (permission)  => {
  return async(req,res,next)=>{
    const userId = req.userId
    console.log(userId)
    
    var userDetails = await User.findOne({where: {id:userId} })
    console.log(userDetails)
    if(permission.includes(userDetails.role)){
      next()
    }else {
      return res.status(401).json("You dont have permission update and add record")
    }
  }
}

updateORDER = (permission)  => {
  return async(req,res,next)=>{
    const userId = req.userId
    console.log(userId)

    var userDetails = await User.findOne({where: {id:userId} })

    console.log(userDetails)
    if(permission.includes(userDetails.role)){
      next()
    }else {
      return res.status(401).json("You dont have permission")
    }
  }
}

DeleteItems = (destrory)  => {
  return async(req,res,next)=>{
    const userId = req.userId
    console.log(userId)

    var userDetails = await User.findOne({where: {id:userId} })

    console.log(userDetails)
    if(destrory.includes(userDetails.role)){
      next()
    }else {
      return res.status(401).json("You dont have permission")
    }
  }
}

UpdateItem = (permission)  => {
  return async(req,res,next)=>{
    const userId = req.userId
    console.log(userId)

    var userDetails = await User.findOne({where: {id:userId} })

    console.log(userDetails)
    if(permission.includes(userDetails.role)){
      next()
    }else {
      return res.status(401).json("You dont have allow to permit to update Item")
    }
  }
}



const authJwt = {
  verifyToken: verifyToken,
  authPage:authPage,
  OrderPage:OrderPage,
  ownOrder:ownOrder,
  ProductInfo:ProductInfo,
  isAdmin: isAdmin,
  DeleteItems:DeleteItems,
  updateORDER:updateORDER,
  ItemRecord:ItemRecord,
  UpdateItem:UpdateItem,
  isManufacturer: isManufacturer,
  isCustomer:isCustomer,
  isManufacturerOrAdmin: isManufacturerOrAdmin
};
module.exports = authJwt;