const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require("./user.model")(sequelize, Sequelize);
db.item = require("./item")(sequelize, Sequelize);
db.order = require("./order")(sequelize, Sequelize);
db.manufacture = require("./manufactures")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize)
// db.user.hasMany(db.order, { as: "orders" });
//one - to - one relationship 
db.order.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});
// db.item.belongsTo(db.manufacture, {
//   foreignKey: "manufacturerId",
//   as: "manufacture",
// });
db.order.belongsTo(db.item, {
  foreignKey: "itemId",
  as: "item",
});

db.manufacture.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});
db.manufacture.hasMany(db.item, {
  foreignKey: "manufacturerId",
});

db.item.hasMany(db.order, {
  foreignKey: "userId",
});

db.user.hasMany(db.order, {
  foreignKey: "userId",
});

//MANY - TO - MANY relationship:
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"

})
db.ROLES = ["Admin","Customer","Manufacturer"];
module.exports = db;