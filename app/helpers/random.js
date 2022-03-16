const db = require('../config/db.config')
const model = require('../models')
const OrderStatusController = require('../controllers/OrderStatus.controller')

exports.NumberGen = (len) => {
    var text = "";
    
    var charset = "0123456789";
    
    for (var i = 0; i < len; i++)
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    
    return text;
    console.log(NumberGen(8));
  }
  
  