const db = require("../models")
const Validator = require('fastest-validator');

const Items = db.item;

exports.create = (req, res) => {
    Items.create({
        itemName: req.body.itemName,
        itemType: req.body.itemType,
        manufactureDate: req.body.manufactureDate,
        expiryDate: req.body.expiryDate,
        manufacturerId: req.body.manufactureDate,
        price: req.body.price,
        image: req.body.image
    }).then((item) => {
        res.status(200).json({
            status: true,
            message: "Item created Successfully"
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
    Items.findAll().then((items) => {
        res.status(200).json({
            status: true,
            data: items
        })
    })

}
// Find a item by Id
exports.findByPk = (req, res) => {
    Items.findByPk(req.params.itemId).then((item) => {
        res.status(200).json({
            status: true,
            data: item
        })
    })
}

// Update a Item
exports.update = (req, res) => {
    const id = req.params.itemId;
    Items.update(
        {
            itemName: req.body.itemName,
            itemType: req.body.itemType,
            manufactureDate: req.body.manufactureDate,
            expiryDate: req.body.expiryDate,
            manufacturerId: req.body.manufactureDate,
            price: req.body.price,
            image: req.body.image
        },
        { where: { id: req.params.itemId } }
    ).then(() => {
        res.status(200).json({
            status: true,
            message: "Item updated successfully with id = " + id
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
    const id = req.params.itemId;
    Items.destroy({
        where: { id: id },
    }).then(() => {
        res.status(200).json({
            status: true,
            message: "Item deleted successfully with id = " + id
        });
    }).catch(error => {
        res.status(200).json({
            message: "Something went wrong",
            error: error
        });
    });
};
