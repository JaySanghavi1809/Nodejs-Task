module.exports = (sequelize, Sequelize) => {
    const orders = sequelize.define("orders", {
        id: {
        type: Sequelize.INTEGER                     
      },
      orderNo: {
        type: Sequelize.INTEGER
      },
      orderDate: {
        type: Sequelize.DATE
      },
      itemId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      status: {
        type:   Sequelize.ENUM,
        values: ['Delivered','Dispatched','Pending','Canceled','Ordered']
      },
      quantity: {
        type: Sequelize.INTEGER
      },
     
    });
    return Orders;
  };