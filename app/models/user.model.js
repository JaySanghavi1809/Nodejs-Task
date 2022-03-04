'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,

        },
        email: {
            type: DataTypes.STRING,

        },
        gender: {
            type: DataTypes.ENUM,
            values: ['male', 'female'],
        },
        password: {
            type: DataTypes.STRING,

        },
        role: {
            type: DataTypes.ENUM,
            values: ['Admin','Customer','Manufacturer'],

        },
        status: {
            type: DataTypes.ENUM,
            values: ['Active', 'Deactive'],
        },
        isVerify: {
            type: DataTypes.INTEGER,

        },
        otp: {
            type: DataTypes.INTEGER,

        },
        expiryOtpTime: {
            type: DataTypes.INTEGER,
        },

    }, {});
    User.associate = function (models) {
        // associations can be defined here
    };
    return User;
};