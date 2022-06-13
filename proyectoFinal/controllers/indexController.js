const products = require("../db/products");
const db = require('../database/models')

const indexController = { 
    index: function(req,res){
       db.Product.findAll({
        })
        .then(function(productos)
           {return res.render('index',{
               productos: productos,
               title: 'Janise Market'
           })})
           
           .catch(function(error){
               console.log(error);
           })
        }
    }

module.exports = indexController; 