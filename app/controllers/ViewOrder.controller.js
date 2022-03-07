const db = require("../models");
const viewOrderRoutes = require("../routes/viewMyOrders.routes");
const ViewOrder = db.order;

exports.create = (req, res) => {
    ViewOrder.create({
        orderNo: req.body.orderNo,
        orderDate: req.body.orderDate,
        itemId: req.body.itemId,
        userId: req.body.userId,
        status: req.body.status,
        quantity: req.body.quantity,

    }).then((order) => {
        res.status(200).json({
            status: true,
            message: "order created Successfully"
        })

    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}



// Get all items
exports.findAll = (req, res) => {
    ViewOrder.findAll().then((views) => {
        res.status(200).json({
            status: true,
            data: views
        })
    })

}
// Find a item by Id
exports.findByPk = (req, res) => {
    ViewOrder.findByPk(req.params.orderId).then((view) => {
        res.status(200).json({
            status: true,
            data: view
        })
    })
}


exports.filteringByStatus = (req, res) => {
    let status = req.query.status;
  
    ViewOrder.findAll({
                        
                        attributes: ['id', 'orderNo', 'orderDate', 'itemId', 'userId', 'status','quantity'],
                        where: {status: status},
                      })
            .then(results => {
              res.status(200).json({
                  message: "Get all ViewOrder with status = " + status,
                  orders: results,
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
      let page = Number.parseInt(req.query.page);
      let limit = Number.parseInt(req.query.limit);
    
      const offset = page ? page * limit : 0;
      console.log(page,limit)
    
      Item.findAndCountAll({ limit: limit, offset:offset })
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
                "viewOrders": data.rows
                
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
      let page = Number.parseInt(req.query.page);
      let limit = Number.parseInt(req.query.limit);
      let status = Number.parseInt(req.query.status);
      
  
      const offset = page ? page * limit : 0;
  
      console.log("offset = " + offset);
    
      Item.findAndCountAll({
                                  attributes: ['id', 'orderNo', 'orderDate', 'itemId', 'userId', 'status','quantity'],
                                  where: {price: price}, 
                                  order: [
                                    ['orderNo', 'ASC'],
                                    ['orderDate', 'DESC']
                                  ],
                                  limit: limit, 
                                  offset:offset 
                                })
        .then(data => {
          const totalPages = Math.ceil(data.count / limit);
          const response = {
            message: "Pagination Filtering Sorting request is completed! Query parameters: page = " + page + ", limit = " + limit + ", price = " + price,
            data: {
                "totalItems": data.count,
                "totalPages": totalPages,
                "limit": limit,
                "price-filtering": price,
                "currentPageNumber": page + 1,
                "currentPageSize": data.rows.length,
                "viewOrders": data.rows
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
  

// Update a Item
exports.update = (req, res) => {
    const id = req.params.orderId;
    ViewOrder.update(
        {
            orderNo: req.body.orderNo,
            orderDate: req.body.orderDate,
            itemId: req.body.itemId,
            userId: req.body.userId,
            status: req.body.status,
            quantity: req.body.quantity,
    
        },
        { where: { id: req.params.orderId } }
    ).then(() => {
        res.status(200).json({
            status: true,
            message: "order updated successfully with id = " + id
        });
    }).catch(error => {
        res.status(200).json({
            message: "Something went wrong",
            error: error
        });
    })
};

// Delete a Item by Id
exports.delete = (req, res) => {
    const id = req.params.orderId;
    ViewOrder.destroy({
        where: { id: id },
    }).then(() => {
        res.status(200).json({
            status: true,
            message: "order deleted successfully with id = " + id
        });
    }).catch(error => {
        res.status(200).json({
            message: "Something went wrong",
            error: error
        });
    });
};