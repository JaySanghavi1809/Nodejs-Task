module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("uSERS", {
        id: {
        type: Sequelize.INTEGER                     
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      gender: {
        type:   Sequelize.ENUM,
        values: ['male','female']
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
        type:   Sequelize.ENUM,
        values: ['Admin','Customer','Manufacturer']
      },
      status: {
        type:   Sequelize.ENUM,
        values: ['Active','Deactive']
      },
      isVerify: {
        type: Sequelize.INTEGER                     
      },
      otp: {
        type: Sequelize.INTEGER                     
      },
      expiryOtpTime: {
        type: Sequelize.INTEGER                     
      },
     
    });
    return User;
  };