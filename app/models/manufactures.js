'use strict';
module.exports = (sequelize, DataTypes) => {
    const Manufacture = sequelize.define('Manufacture', {
        manufactureName: {
            type: DataTypes.STRING,    
        },
        userId: {
            type: DataTypes.INTEGER,
        },

    }, {});
    Manufacture.associate = models => {
        Manufacture.belongsTo(models.User, {
          foreignKey: 'userId',
          
        });
      }
    return Manufacture;
};