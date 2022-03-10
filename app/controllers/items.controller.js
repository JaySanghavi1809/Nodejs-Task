/**
 * Copyright by https://loizenai.com
 * youtube loizenai
 */

// const db = require('../config/db.config.js');
const model = require('../models')
const Item = model.item;
const Orders = model.order
const Manufacture = model.manufacture

exports.pagination = (req, res) => {
  try {
    let page = req.params.page;
    let limit = req.query.limit;

    const offset = page ? page * limit : 0;
    console.log(offset)

    Item.findAndCountAll({ limit: limit, offset: offset })
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
            "items": data.rows
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

exports.filteringByPrice = (req, res) => {
  let price = req.query.price;

  Item.findAll({
    attributes: ['id', 'itemName', 'itemType', 'manufactureDate', 'expiryDate', 'manufacturerId', 'price', 'image'],
    where: { price: price }
  })
    .then(results => {
      res.status(200).json({
        message: "Get all Items with price = " + price,
        totalItems: results.length,
        items: results,
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



exports.pagingfilteringsorting = (req, res) => {
  try {
    let page = req.params.page;
    let limit = req.query.limit;
    let price = req.query.price;

    const offset = page ? page * limit : 1;

    console.log("offset = " + offset);

    Item.findAndCountAll({
      attributes: ['id', 'itemName', 'itemType', 'manufactureDate', 'expiryDate', 'manufacturerId', 'price', 'image'],
      where: { price: price },
      order: [
        ['itemName', 'ASC'],
        ['itemType', 'DESC']
      ],
      limit: limit,
      offset: offset
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
            "items": data.rows,
           
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


exports.create = (req, res) => {
  let item = {};
  RolePermission(["Admin","Manufacture"]);

  try {
    // Building Item object from upoading request's body
    item.itemName = req.body.itemName;
    item.itemType = req.body.itemType;
    item.manufactureDate = req.body.manufactureDate;
    item.expiryDate = req.body.expiryDate;
    item.manufacturerId = req.body.manufacturerId;
    item.price = req.body.price;
    item.image = req.body.image;
    

    // Save to MySQL database
    Item.create(item).then(result => {
      // send uploading message to client
      res.status(200).json({
        message: "Upload Successfully a Item with id = " + result.id,
        item: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message
    });
  }
}



exports.retrieveAllItems = async (req, res) => {
  // find all Item information from 
  await Item.findAll({
    include: [{
      model: Orders
    }],
    // where: { id: 1 }
  })
    .then(iteminfo => {
      res.status(200).json({
        message: "Get all Items' Infos Successfully!",
        items: iteminfo
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

exports.getItemById = (req, res) => {
  // find all Item information from 
  let item_Id = req.params.id;
  Item.findByPk(item_Id)
    .then(item => {
      res.status(200).json({
        message: " Successfully Get a Item with id = " + item_Id,
        items: item
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

exports.filteringByPrice = (req, res) => {
  let price = req.query.price;

    Item.findAll({
                      
                      attributes: ['id', 'itemName', 'itemType', 'manufactureDate', 'expiryDate', 'manufacturerId','price','image'],
                      where: {price: price},
                      include: [{
                        model: Orders
                      }],
                    })
          .then(results => {
            res.status(200).json({
                message: "Get all Items with price = " + price,
                items: results,
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
              "items": data.rows
              
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
    let price = Number.parseInt(req.query.price);
    

    const offset = page ? page * limit : 0;

    console.log("offset = " + offset);
  
    Item.findAndCountAll({
                                attributes: ['id', 'itemName', 'itemType', 'manufactureDate', 'expiryDate', 'manufacturerId','price','image'],
                                where: {price: price}, 
                                order: [
                                  ['itemName', 'ASC'],
                                  ['itemType', 'DESC']
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
              "items": data.rows
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



exports.updateById = async (req, res) => {
  RolePermission(["Admin","Manufacturer"]);
  try {
    
    let item_Id = req.params.id;
    let item = await Item.findByPk(item_Id);

    if (!item) {
      // return a response to client
      res.status(404).json({
        message: "Not Found for updating a item with id = " + item_Id,
        item: "",
        error: "404"
      });
    } else {
      // update new change to database
      let updatedObject = {
        itemName: req.body.itemName,
        itemType: req.body.itemType,
        manufactureDate: req.body.manufactureDate,
        expiryDate: req.body.expiryDate,
        manufacturerId: req.body.manufacturerId,
        price: req.body.price,
        image: req.body.image
      }
      let result = await Item.update(updatedObject, { returning: true, where: { id: item_Id } });
      

      // return the response to client
      if (!result) {
        res.status(500).json({
          message: "Error -> Can not update a item with id = " + req.params.id,
          error: "Can NOT Updated",
        });
      }

      res.status(200).json({
        message: "Update successfully a Item with id = " + item_Id,
        item: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> Can not update a item with id = " + req.params.id,
      error: error.message
    });
  }
}

exports.deleteById = async (req, res) => {
  try {
    let item_Id = req.params.id;
    let item = await Item.findByPk(item_Id);

    if (!item) {
      res.status(404).json({
        message: "Does Not exist a Item with id = " + item_Id,
        error: "404",
      });
    } else {
      await item.destroy();
      res.status(200).json({
        message: "Delete Successfully a Item with id = " + item_Id,
        item: item,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> Can NOT delete a item with id = " + req.params.id,
      error: error.message,
    });
  }
}


