const db = require("../models");
const { generateOtp } = require("../helpers/util")
const { sendMail, OtpMail } = require("../helpers/email.helper")
const OTP_EXPIRE_TIME = process.env.OTP_EXPIRE_TIME;
const moment = require('moment');
const User = db.user;
const Role = db.role;
const Order= db.order

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var otp = generateOtp(4);

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
    otp: otp,
    otp_exp_time: moment(new Date()).add(OTP_EXPIRE_TIME, 'seconds').format('YYYY-MM-DD HH:mm:ss'),
    type: 0
  })

  sendMail(
    to = body.email,
    subject = 'Welcome to Verification',
    template = OtpMail({ otp: otp })
)


    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
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

exports.verifyOtp = async (req, res) => {

  try {

      let body = req.body;

      // finding user with email
      var emailcheck = await User.findOne({ where: { type: 'email', data: body.email } })
      if (!emailcheck) {
          return res.status(400).send({ status: false, message: res.__('ERROR_EMAIL_NOT_EXIST') })
      }

      // checking valid user data
      var EMAILCHECK = await OauthUser.findOne({ where: { id: EMAILCHECK.user_id } })
      if (!EMAILCHECK) {
          return res.status(400).send({ status: false, message: res.__('ERROR_USER_NOT_FOUND') })
      }

      // checking user status
      var UserData = await User.findOne({ where: { user_id: EMAILCHECK.user_id } })
      if (body.type == 'Signup' && UserData.status === 'active') {
          return res.status(400).send({ status: false, message: res.__('ERROR_USER_ALREADY_VERIFY') })
      }

      if (UserData.otp != body.otp) {
          return res.status(400).send({ status: false, message: res.__('ERROR_INVALID_OTP') })
      }

      if (moment(UserData.otp_exp_time) < moment(new Date())) {
          return res.status(400).send({ status: false, message: res.__('ERROR_OTP_EXPIRED') })
      }

      // Update user status
      var UserUpdateData = User.update({ otp: null, otp_exp_time: null, status: 'active' }, { where: { user_id: EMAILCHECK.user_id } });

      // generating token
      const token = generateToken({ id: OauthUserData.id, email: body.email })
      let user_meta = await UserMeta.findOne({ attributes: ['type', 'data'], where: { user_id: EMAILCHECK.id, type: 'URI' } });
      if (!user_meta) {
          var UserMetaCreate = {
              user_id: EMAILCHECK.id,
              type: 'URI',
              data: EMAILCHECK.id
          }
          user_meta = await UserMeta.create(UserMetaCreate);
      }
      var responseData = {
          user_id: EMAILCHECK.id,
          email: body.email,
          token: token,
          user_meta: user_meta ? user_meta : {}
      }

      res.status(200).send({ status: true, message: res.__('SUCCESS_REGISTERED'), data: responseData })
      logger.info({ message: res.__('SUCCESS_REGISTERED'), responseData })

  } catch (e) {
      console.log(e)
      res.send({ status: false, message: e.message })
      logger.error(e.message)
  }
}



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
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};