const db = require('../config/db.config.js');
const model = require('../models');
const item = require('../models/item.js');

const Item = model.item;
const Manufactures = model.manufacture;
exports.create = (req, res) => {
    Manufactures.create({
        manufactureName: req.body.manufactureName,
        userId: req.body.userId,

    }).then((manufacture) => {
        res.status(200).json({
            status: true,
            message: "manufacture information  created Successfully"
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
    Manufactures.findAll().then((manufactures) => {
        res.status(200).json({
            status: true,
            data: manufactures
        })
    })

}
// Find a item by Id
exports.findByPk = (req, res) => {
    Manufactures.findByPk(req.params.manufacture_Id).then((manufacture) => {
        res.status(200).json({
            status: true,
            data: manufacture
        })
    })
}

// Update a Item
exports.update = (req, res) => {
    const id = req.params.manufacture_Id;
    Manufactures.update(
        {
            manufactureName: req.body.manufactureName,
            userId: req.body.userId,
        },
        { where: { id: req.params.manufacture_Id } }
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
    const id = req.params.manufacture_Id;
    Manufactures.destroy({
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

}

exports.getAllBadges = async (req, res) => {
    Manufactures.findAll({
        include: [{
          model: item,
          as: 'Instruments',
          required: false
          }]
        })
    } 
    
    
      
