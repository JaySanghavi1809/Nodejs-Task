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