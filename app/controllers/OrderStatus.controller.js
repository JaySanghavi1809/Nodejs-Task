const db = require('../config/db.config.js');
const model = require('../models')
const helpers = require('../helpers/random')
const Item = model.item;
const User = db.user;
const Role = db.role; 
const Orders = model.order
const Manufacture = model.manufacture

exports.updateOrderStatus = async (req, res) => {
    // UpdateOrder(["Admin","Manufacturer"])
    UpdateOrderByCustomer(["Customer"])
   
    try {
        let order_id = req.params.id;
        let order = await Orders.findByPk(order_id);

        const userId = req.userId
        console.log(userId)
        var userDetails = await User.findOne({ where: { id: userId } })



        if (!order) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a Order with id = " + order_id,
                order: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                orderNo: req.body.orderNo,
                status: req.body.status,
            }
            
            let result = await Orders.update(updatedObject, { returning: true, where: { id: order_id } });

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a Orders with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Manufacture with id = " + order_id,
                order: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a manufacture with id = " + req.params.id,
            error: error.message
        });
    }
}


exports.filteringByStatus = (req, res) => {
    let status = req.query.status;

    Orders.findAll({
        attributes: ['id', 'orderNo', 'orderDate', 'itemId', 'userId', 'status', 'quantity'],
        where: { status: status }
    })
        .then(results => {
            res.status(200).json({
                message: "Get all Orders with status = " + status,
                orderstatus: results,
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}



UpdateOrderByCustomer = (permission) => {
    return async (req, res, next) => {
      const userId = req.userId
      console.log(userId)
  
      var userDetails = await User.findOne({ where: { id: userId } })
  
      console.log(userDetails)
      if (permission.includes(userDetails.role)) {
       
  
        console.log(userDetails.role)
  
        next()
      } else {
        return res.status(401).json("You dont have permission")
      }
    }
  }







