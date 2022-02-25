'use strict';
module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('item', {
        itemName: {
            type: DataTypes.STRING,

        },
        itemType: {
            type: DataTypes.STRING,

        },
        manufactureDate: {
            type: DataTypes.DATE,
        },
        expiryDate: {
            type: DataTypes.DATE,
        },
        manufacturerId: {
            type: DataTypes.INTEGER,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        image: {
            type: DataTypes.STRING,
        },

    }, {});
    Item.associate = models => {
        Item.belongsTo(models.manufactures, {
            foreignKey: 'manufacturerId '
        });
    }
    return Item;
};