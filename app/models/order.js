'use strict';
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        orderNo: {
            type: DataTypes.INTEGER,
            
        },
        orderDate: {
            type: DataTypes.DATE,
        },
        itemId : {
            type: DataTypes.INTEGER,
            
        },
        userId  : {
            type: DataTypes.INTEGER,
            
        },
        status: {
          type: DataTypes.ENUM,
          values: ['Delivered','Dispatched','Pending','Canceled','Ordered'],
          defaultValue: 'Pending'
      },
          quantity: {
            type: DataTypes.INTEGER,
            
          },

          

    }, {});
    Order.associate = models => {
        Order.belongsTo(models.Item, {
          foreignKey: 'itemId '
        });
        Order.belongsTo(models.User, {
          foreignKey: 'userId '
        });
    
};
return Order;

};