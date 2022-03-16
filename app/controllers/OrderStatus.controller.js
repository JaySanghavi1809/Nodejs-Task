const db = require('../config/db.config.js');
const model = require('../models')
const helpers = require('../helpers/random')
const Item = model.item;
const Orders = model.order
const Manufacture = model.manufacture

exports.create = (req, res) => {
    let orderstatus = {};

    try {
        // Building Customer object from upoading request's body
        orderstatus.orderNo = req.body.orderNo,
        orderstatus.orderDate = req.body.orderDate,
        orderstatus.itemId = req.body.itemId,
        orderstatus.userId = req.body.userId,
        orderstatus.status = helpers.NumberGen(length),
        orderstatus.quantity = req.body.quantity,
        console.log(helpers.NumberGen(length))


            // Save to MySQL database
            Orders.create(orderstatus).then(result => {
               var status = helpers.NumberGen(length)
               console.log(status)
                // send uploading message to client
                res.status(200).json({
                    message: "Upload Successfully a order with id = " + result.id,
                    orderstatus: result,
                });
            });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllOrder = (req, res) => {
    // // ItemDate(["Customer"]),
    // OrderPage(["Admin"])
    // // find all Customer information from 
    Orders.findAll({
        includes:[{
            model:Item
        }]
    })
        .then(ordersInfos => {
            res.status(200).json({
                message: "Get all Order' Infos Successfully!",
                orderstatus: ordersInfos
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

exports.get_Order_DetailsById = (req, res) => {
    
    let order_id = req.params.id;
    Orders.findByPk(order_id)
        .then(order => {
            res.status(200).json({
                message: " Successfully Get a Order with id = " + order_id,
                orderstatus: orderstatus
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
  
    try {
        let order_id = req.params.id;
        let orderstatus = await Orders.findByPk(order_id);

        if (!orderstatus) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a Order with id = " + order_id,
                orderstatus: "",
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

            
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a Orders with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Manufacture with id = " + order_id,
                orderstatus: updatedObject,
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
        let orderstatus = await Orders.findByPk(order_id);

        if (!orderstatus) {
            res.status(404).json({
                message: "Does Not exist a Manufacture with id = " + order_id,
                error: "404",
            });
        } else {
            await orderstatus.destroy();
            res.status(200).json({
                message: "Delete Successfully a order with id = " + order_id,
                orderstatus: orderstatus,
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
                        attributes: ['id', 'orderNo', 'orderDate', 'itemId', 'userId', 'status','quantity'],
                        where: {status: status}
                      })
            .then(results => {
              res.status(200).json({
                  message: "Get all Orders with status = " + status,
                  orderstatus: results,
              });
            })
            . catch(error => {
                console.log(error);
                res.status(500).json({
                  message: "Error!",
                  error: error
                });
              });
  }
   
  exports.pagination = (req, res) => {
    try{
      let page = parseInt(+req.params.page);
      let limit = parseInt(req.query.limit);
    
    
      const offset = page ? page * limit : 0;
    
      Orders.findAndCountAll({ limit: limit, offset:offset })
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
                "orderstatus": data.rows
            }
          };
          res.send(response);
        });  
    }catch(error) {
      res.status(500).send({
        message: "Error -> Can NOT complete a paging request!",
        error: error.message,
      });
    }    
  }
  
  exports.pagingfilteringsorting = (req, res) => {
    try{
      let page = parseInt(req.query.page);
      let limit = parseInt(req.query.limit);
      let status = (req.query.status === 'true');
    
      const offset = page ? page * limit : 0;
  
      console.log("offset = " + offset);
    
      Orders.findAndCountAll({
                                  attributes: ['id', 'orderNo', 'orderDate', 'itemId', 'userId', 'status','quantity'],
                                  where: {status: status}, 
                                  orderstatus: [
                                    ['orderNo', 'ASC'],
                                    ['orderDate', 'DESC']
                                  ],
                                  limit: limit, 
                                  offset:offset 
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
                "orderstatus": data.rows
            }
          };
          res.send(response);
        });  
    }catch(error) {
      res.status(500).send({
        message: "Error -> Can NOT complete a paging request!",
        error: error.message,
      });
    }      
  }