const db = require("../models")
const Orders = db.order;

exports.create = (req, res) => {
    Orders.create({
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
    Orders.findAll().then((orders) => {
        res.status(200).json({
            status: true,
            data: orders
        })
    })

}
// Find a item by Id
exports.findByPk = (req, res) => {
    Orders.findByPk(req.params.orderId).then((order) => {
        res.status(200).json({
            status: true,
            data: order
        })
    })
}

exports.filteringByStatus = (req, res) => {
    let status = req.query.status;
  
      Orders.findAll({
                        attributes: ['id', 'orderNo', 'orderDate', 'itemId', 'userId', 'status', 'quantity'],
                        where: {status: status}
                      })
            .then(results => {
              res.status(200).json({
                  message: "Get all order with status = " + status,
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

// Update a Item
exports.update = (req, res) => {
    const id = req.params.orderId;
    Orders.update(
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
    Orders.destroy({
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