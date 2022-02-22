module.exports = (sequelize, Sequelize) => {
    const Manufacture = sequelize.define("manufactures", {
        id: {
        type: Sequelize.INTEGER                     
      },
      manufactureName: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
     
    });
    return Manufacture;
  };