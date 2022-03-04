

 const db = require('../config/db.config.js');
 const model = require('../models')
 const Item = model.item;
 const Orders = model.order
 const Manufacture = model.manufacture
 
 exports.create = (req, res) => {
     let manufacture = {};
 
     try{
         // Building Customer object from upoading request's body
         manufacture.manufactureName = req.body.manufactureName;
         manufacture.userId = req.body.userId;
     
         // Save to MySQL database
         Manufacture.create(Manufacture).then(result => {    
             // send uploading message to client
             res.status(200).json({
                 message: "Upload Successfully a manufacture with id = " + result.id,
                 manufacture: result,
             });
         });
     }catch(error){
         res.status(500).json({
             message: "Fail!",
             error: error.message
         });
     }
 }
 
 exports.retrieveAllManufacture = (req, res) => {
     // find all Customer information from 
     Manufacture.findAll({
        include: [ {
            model : Item
          }]
     })
         .then(manufacturerInfos => {
             res.status(200).json({
                 message: "Get all Manufacture' Infos Successfully!",
                 manufactures: manufacturerInfos
             });
         })
         . catch(error => {
           // log on console
           console.log(error);
 
           res.status(500).json({
               message: "Error!",
               error: error
           });
         });
 }
 
 exports.getManufactureById = (req, res) => {
   // find all Customer information from 
   let manufacture_Id = req.params.id;
   Manufacture.findByPk(manufacture_Id)
       .then(manufacture => {
           res.status(200).json({
               message: " Successfully Get a Manufacture with id = " + manufacture_Id,
               manufactures: manufacture
           });
       })
       . catch(error => {
         // log on console
         console.log(error);
 
         res.status(500).json({
             message: "Error!",
             error: error
         });
       });
 }
 
exports.updateById = async (req, res) => {
     try{
         let manufacture_Id = req.params.id;
         let manufacture = await Manufacture.findByPk(manufacture_Id);
     
         if(!manufacture){
             // return a response to client
             res.status(404).json({
                 message: "Not Found for updating a Manufacture with id = " + manufacture_Id,
                 manufacture: "",
                 error: "404"
             });
         } else {    
             // update new change to database
             let updatedObject = {
                manufactureName : req.body.manufactureName,
                userId :req.body.userId
             }
             let result = await Manufacture.update(updatedObject, {returning: true, where: {id: manufacture_Id}});
             
             // return the response to client
             if(!result) {
                 res.status(500).json({
                     message: "Error -> Can not update a Manufacture with id = " + req.params.id,
                     error: "Can NOT Updated",
                 });
             }
 
             res.status(200).json({
                 message: "Update successfully a Manufacture with id = " + manufacture_Id,
                 manufacture: updatedObject,
             });
         }
     } catch(error){
         res.status(500).json({
             message: "Error -> Can not update a manufacture with id = " + req.params.id,
             error: error.message
         });
     }
 }
 
 exports.deleteById = async (req, res) => {
     try{
         let manufacture_Id = req.params.id;
         let manufacture = await Manufacture.findByPk(manufacture_Id);
 
         if(!manufacture){
             res.status(404).json({
                 message: "Does Not exist a Manufacture with id = " + manufacture_Id,
                 error: "404",
             });
         } else {
             await manufacture.destroy();
             res.status(200).json({
                 message: "Delete Successfully a Manufacture with id = " + manufacture_Id,
                 manufacture: manufacture,
             });
         }
     } catch(error) {
         res.status(500).json({
             message: "Error -> Can NOT delete a customer with id = " + req.params.id,
             error: error.message,
         });
     }
 }