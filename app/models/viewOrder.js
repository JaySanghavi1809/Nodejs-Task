'use strict';
module.exports = (sequelize, DataTypes) => {
    const viewOrder = sequelize.define('viewOrder', {
        orderNo: {
            type: DataTypes.INTEGER,
        },
        orderId: {
            type: DataTypes.DATE,
        },
        Quentity : {
            type: DataTypes.INTEGER,
            
        },
        price  : {
            type: DataTypes.INTEGER,
            
        },
        status: {
            type: DataTypes.ENUM,
            values: ['Delivered','Dispatched','Pending','Canceled','Ordered'],
            
          },

    }, {});
    viewOrder.associate = models => {
        viewOrder.belongsTo(models.order, {
          foreignKey: 'orderId '
        });
        Order.belongsTo(models.User, {
          foreignKey: 'userId '
        });
    
};
return viewOrder;

};