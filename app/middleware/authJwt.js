const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Role = db.role;
const User = db.user;

verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token'];
  
	if (!token){
		return res.status(403).send({ 
			auth: false, message: 'No token provided.' 
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err){
			return res.status(500).send({ 
					auth: false, 
					message: 'Fail to Authentication. Error -> ' + err 
				});
		}
		req.userId = decoded.id;
		next();
	});
}

isCustomer = (req, res, next) => {
	let token = req.headers['x-access-token'];
	
	User.findByPk(req.userId)
		.then(user => {
			user.getRoles().then(roles => {
				for(let i=0; i<roles.length; i++){
					console.log(roles[i].name);
					if(roles[i].name.toUpperCase() === "CUSTOMER"){
						next();
						return;
					}
				}
				
				res.status(403).send("Require Customer Role!");
				return;
			})
		})
}


isAdmin = (req, res, next) => {
	let token = req.headers['x-access-token'];
	
	User.findByPk(req.userId)
		.then(user => {
			user.getRoles().then(roles => {
				for(let i=0; i<roles.length; i++){
					console.log(roles[i].name);
					if(roles[i].name.toUpperCase() === "ADMIN"){
						next();
						return;
					}
				}
				
				res.status(403).send("Require Admin Role!");
				return;
			})
		})
}

isManufacturer = (req, res, next) => {
	let token = req.headers['x-access-token'];
	
	User.findByPk(req.userId)
		.then(user => {
			user.getRoles().then(roles => {
				for(let i=0; i<roles.length; i++){
					console.log(roles[i].name);
					if(roles[i].name.toUpperCase() === "Manufacturer"){
						next();
						return;
					}
				}
				
				res.status(403).send("Require Manufacturer Role!");
				return;
			})
		})
}


isCustomerOrAdminOrManufacturer = (req, res, next) => {
	let token = req.headers['x-access-token'];
	
	User.findByPk(req.userId)
		.then(user => {
			user.getRoles().then(roles => {
				for(let i=0; i<roles.length; i++){					
					if(roles[i].name.toUpperCase() === "CUSTOMER"){
						next();
						return;
					}
					
					if(roles[i].name.toUpperCase() === "ADMIN"){
						next();
						return;
					}

          if(roles[i].name.toUpperCase() === "Manufacturer"){
						next();
						return;
					}
				}
				
				res.status(403).send("Require Customer or Admin or Manufacturer Roles!");
			})
		})
}

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isCustomer = isCustomer;
authJwt.isAdmin = isAdmin;
authJwt.isManufacturer= isManufacturer;
authJwt.isCustomerOrAdminOrManufacturer = isCustomerOrAdminOrManufacturer;

module.exports = authJwt;