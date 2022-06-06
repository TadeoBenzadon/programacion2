const products = require("../db/products");
const db = require('../database/models')

const indexController = { 
    index: function(req,res){
       db.Product.findAll({
           order: [['electro_year', 'ASC']],
           limit: 12, 
           include: [
               {association: 'user'},
               {association: 'comment',
                include:{association: 'user'}}
           ]})
    }
}

module.exports = indexController; 