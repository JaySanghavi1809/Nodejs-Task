

   const db = require("../models");
   const config = require("../config/auth.config");
   const User = db.user;
   const Orders = db.order
   
   const Op = db.Sequelize.Op;
   
   var jwt = require("jsonwebtoken");
   var bcrypt = require("bcryptjs");
   

exports.create = (req, res) => {
    let user = {};

    try {
        // Building Customer object from upoading request's body
        user.username = req.body.username,
            user.email = req.body.email,
            user.gender = req.body.gender,
            user.password = bcrypt.hashSync(req.body.password, 8),
            user.role = req.body.role,
            user.status = req.body.status,
            userisVerify = req.body.isVerify,
            user.otp = req.body.otp,
            user.expiryOtpTime = req.body.expiryOtpTime,

            // Save to MySQL database
            User.create(user).then(result => {
                // send uploading message to client
                res.status(200).json({
                    message: "Upload Successfully a User with id = " + result.id,
                    user: result,
                });
            });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllUser = (req, res) => {
    // find all Customer information from 
    User.findAll()
        .then(userInfos => {
            res.status(200).json({
                message: "Get all user' Infos Successfully!",
                users: userInfos
            });
        })
        .catch(error => {
            // log on console
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getUserById = (req, res) => {
    // find all Customer information from 
    let user_id = req.params.id;
    User.findByPk(user_id)
        .then(user => {
            res.status(200).json({
                message: " Successfully Get a User with id = " + user_id,
                users: user
            });
        })
        .catch(error => {
            // log on console
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let user_id = req.params.id;
        let user = await User.findByPk(user_id);

        if (!user) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a User with id = " + user_id,
                user: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                username: req.body.username,
                email: req.body.email,
                gender: req.body.gender,
                password: bcrypt.hashSync(req.body.password, 8),
                role: req.body.role,
                status: req.body.status,
                isVerify: req.body.isVerify,
                otp: req.body.otp,
                expiryOtpTime: req.body.expiryOtpTime,
            }
            let result = await User.update(updatedObject, { returning: true, where: { id: user_id } });

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a User with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a USER with id = " + user_id,
                user: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a user with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let user_id = req.params.id;
        let user = await User.findByPk(user_id);

        if (!user) {
            res.status(404).json({
                message: "Does Not exist a USER with id = " + user_id,
                error: "404",
            });
        } else {
            await user.destroy();
            res.status(200).json({
                message: "Delete Successfully a USER with id = " + user_id,
                user: user,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a customer with id = " + req.params.id,
            error: error.message,
        });
    }
}