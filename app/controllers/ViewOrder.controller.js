const db = require("../models")
const viewOrder = db.order;

exports.create = (req, res) => {
    viewOrder.create({
        orderNo: req.body.orderNo,
        orderId: req.body.orderId,
        Quentity: req.body.Quentity,
        userId: req.body.userId,
        price: req.body.price,
        status: req.body.status,

    }).then((viewOrder) => {
        res.status(200).json({
            status: true,
            message: "user display order details Successfully"
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
    viewOrder.findAll().then((viewOrders) => {
        res.status(200).json({
            status: true,
            data: viewOrders
        })
    })

}


