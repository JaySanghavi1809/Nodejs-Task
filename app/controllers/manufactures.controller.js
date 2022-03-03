const db = require('../config/db.config.js');
const model = require('../models')
const Item = model.item;
const Manufacture = model.manufacture

exports.index = (req, res) => {
    Manufacture.findAll({
        include: [{
            model: Item,
            as: 'items'
        }]
    })
        .then((manufacture) => {
            return res.status(200).json(manufacture)
        })
        .catch((error) => {
            return res.status(400).json(error)
        });
}

exports.create = (req, res) => {
    Manufacture.create({
        manufactureName: req.body.manufactureName,
        userId: req.body.userId

    })
        .then((manufacture) => {
            return res.status(200).json(manufacture)
        })
        .catch((error) => {
            return res.status(400).json(error)
        });
}

exports.show = (req, res) =>{
    User.findById(req.params.id, {
        include: [{
          model: Item,
          as: 'items'
        }]
      })
      .then((manufacture) => {
        if (!manufacture) {
          return res.status(404).json({ message: 'User Not Found' });
        }
  
        return res.status(200).json(manufacture);
      })
      .catch((error) => {
        return res.status(400).json(error)
      });
  }
exports.update = (req, res) => {
    Manufacture.findById(req.params.id)
    .then((manufacture) => {
      if (!manufacture) {
        return res.status(404).json({ message: 'Manufacture-Unit Not Found' });
      }

      manufacture.update({
        ...manufacture, 
        ...req.body 
      })
      .then((updatedManufacture) => {
        return res.status(200).json(updatedManufacture)
      })
      .catch((error) => {
        return res.status(400).json(error)
      });
    })
    .catch((error) => {
      return res.status(400).json(error)
    });

}


exports.destroy = (req, res) => {
    User.findById(req.params.id)
      .then((manufacture) => {
        if (!manufacture) {
          return res.status(400).json({ message: '  Manufacture-Unit Not Found' });
        }
  
        manufacture.destroy()
          .then((manufacture) => {
            return res.status(200).json(manufacture)
          })
          .catch((error) => {
            return res.status(400).json(error)
          });
      })
      .catch((error) => {
        return res.status(400).json(error)
      });
  }







