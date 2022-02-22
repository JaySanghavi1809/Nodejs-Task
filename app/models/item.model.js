module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("items", {
        id: {
        type: Sequelize.INTEGER                     
      },
      itemName: {
        type: Sequelize.STRING
      },
      itemType: {
        type: Sequelize.STRING
      },
      manufactureDate: {
        type: Sequelize.DATE
      },
      expiryDate: {
        type: Sequelize.DATE
      },
      manufacturerId: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      }
    });
    return Item;
  };