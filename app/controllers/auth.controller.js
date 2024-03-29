const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Order= db.order

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    gender: req.body.gender,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role,
    status: req.body.status,
    isVerify: req.body.isVerify,
    otp: req.body.otp,
    expiryOtpTime: req.body.expiryOtpTime,
  })
    .then(user => {
      if (req.body.role) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.role
            }
            
          }
          
        }).then(role => {
          user.setRoles(role).then(() => {
            res.send({ message: "User registered successfully!" });
            console.log(req.body.role)
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(role => {
        for (let i = 0; i < role.length; i++) {
          authorities.push("ROLE_" + role[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          role: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};