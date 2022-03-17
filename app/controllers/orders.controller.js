const db = require('../config/db.config.js');
const model = require('../models')
const authjwt = require('../middleware/authJwt')
const helpers = require('../helpers/random');
const { UpdateOrder } = require('../middleware/authJwt.js');
const Orders = model.order
const Manufacture = model.manufacture
const User = db.user;
const Item = db.item;
const Role = db.role;

exports.Updateinfo = (permission) => {
    return async (req, res, next) => {
      const userId = req.userId
      console.log(userId)
  
      var userDetails =  User.findOne({ where: { id: userId } })
  
      console.log(userDetails)
      if (permission.includes(userDetails.role)) {
        console.log(userDetails.role)
  
        next()
      } else {
        return res.status(401).json("You dont have permission")
      }
    }
  }

exports.create = (req, res) => {
    let order = {};

    // result.expiryDate > new Date()

    try {
        // Building Customer object from upoading request's body
        order.orderNo = helpers.NumberGen(8)
        console.log(order.orderNo)
        order.orderDate = req.body.orderDate,
            order.itemId = req.body.itemId,
            order.userId = req.body.userId,
            order.status = req.body.status,
            order.quantity = req.body.quantity,

            Item.findByPk(req.body.itemId).then(result => {
                console.log(result.expiryDate, new Date())
               if (new Date(result.expiryDate) <  new Date()) {
                    res.status(500).json({
                        message: "order can't created "
                    });
                } else {
                    Orders.create(order).then(result => {

                        // send uploading message to client
                        res.status(200).json({
                            message: "Upload Successfully a order with id = " + result.id,
                            order: result,
                        });
                    });

                }
            })
    } catch (error) {
        res.status(500).json({
            message: "Not upload order !",
            error: error.message
        });
    }
}

exports.retrieveAllOrder = (req, res) => {
    // ItemDate(["Customer"]),
    OrderPage(["Admin"])
    // find all Customer information from 
    Orders.findAll({
        includes: [{
            model: Item
        }]
    })
        .then(ordersInfos => {
            res.status(200).json({
                message: "Get all Order' Infos Successfully!",
                orders: ordersInfos
            });
        })
        .catch(error => {
            // log on console
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.get_Order_DetailsById = (req, res) => {
    // find all Customer information from 
    let order_id = req.params.id;
    Orders.findByPk(order_id)
        .then(order => {
            res.status(200).json({
                message: " Successfully Get a Order with id = " + order_id,
                orders: order
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}


exports.updateById = async (req, res) => {
    // UpdateOrder(["Admin","Manufacturer"])
    UpdateOrderByCustomer(["Customer"])
    try {
        let order_id = req.params.id;
        let order = await Orders.findByPk(order_id);

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
                orderDate: req.body.orderDate,
                itemId: req.body.itemId,
                userId: req.body.userId,
                status: req.body.status,
                quantity: req.body.quantity,


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

exports.UpdateOrderStatus = async (req, res) => {
    // UpdateOrder(["Admin","Manufacturer"])
   
    try {
        let order_id = req.params.id;
        let order = await Orders.findByPk(order_id);
        const Updateinfo = (["Customer"])

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
                status: req.body.status
            }
            const userId = req.userId
            console.log(userId)
            let result = await Orders.update(updatedObject, { returning: true, where: { id: order_id } });
           

            // return the response to client
     
            
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a Orders with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }
            Orders.findByPk(req.body.order_id).then(result => {
                console.log(result)
                if (result.status == 'Delivered','Dispatched','Pending') {
                     res.status(500).json({
                         message: "dont allow to update status  "
                     });
                }

            })
            

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

exports.deleteById = async (req, res) => {
    try {
        let order_id = req.params.id;
        let order = await Orders.findByPk(order_id);

        if (!order) {
            res.status(404).json({
                message: "Does Not exist a Manufacture with id = " + order_id,
                error: "404",
            });
        } else {
            await order.destroy();
            res.status(200).json({
                message: "Delete Successfully a order with id = " + order_id,
                order: order,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a customer with id = " + req.params.id,
            error: error.message,
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
                order: results,
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

exports.pagination = (req, res) => {
    try {
        let page = parseInt(+req.params.page);
        let limit = parseInt(req.query.limit);


        const offset = page ? page * limit : 0;

        Orders.findAndCountAll({ limit: limit, offset: offset })
            .then(data => {
                const totalPages = Math.ceil(data.count / limit);
                const response = {
                    message: "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
                    data: {
                        "totalItems": data.count,
                        "totalPages": totalPages,
                        "limit": limit,
                        "currentPageNumber": page + 1,
                        "currentPageSize": data.rows.length,
                        "orders": data.rows
                    }
                };
                res.send(response);
            });
    } catch (error) {
        res.status(500).send({
            message: "Error -> Can NOT complete a paging request!",
            error: error.message,
        });
    }
}

exports.pagingfilteringsorting = (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        let status = (req.query.status === 'true');

        const offset = page ? page * limit : 0;

        console.log("offset = " + offset);

        Orders.findAndCountAll({
            attributes: ['id', 'orderNo', 'orderDate', 'itemId', 'userId', 'status', 'quantity'],
            where: { status: status },
            order: [
                ['orderNo', 'ASC'],
                ['orderDate', 'DESC']
            ],
            limit: limit,
            offset: offset
        })
            .then(data => {
                const totalPages = Math.ceil(data.count / limit);
                const response = {
                    message: "Pagination Filtering Sorting request is completed! Query parameters: page = " + page + ", limit = " + limit + ", status = " + status,
                    data: {

                        "totalItems": data.count,
                        "totalPages": totalPages,
                        "limit": limit,
                        "status-filtering": status,
                        "currentPageNumber": page + 1,
                        "currentPageSize": data.rows.length,
                        "orders": data.rows
                    }
                };
                res.send(response);
            });
    } catch (error) {
        res.status(500).send({
            message: "Error -> Can NOT complete a paging request!",
            error: error.message,
        });
    }
}







