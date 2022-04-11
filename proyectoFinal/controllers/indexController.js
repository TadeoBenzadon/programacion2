const products = require("../db/products");
const data = require("../db/products")

const indexController = { 
    index: function(req,res){
        return res.render('index', {productos: products.lista})
           
    }
}

module.exports = indexController; 