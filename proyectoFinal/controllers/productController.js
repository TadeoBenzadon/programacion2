const data = require("../db/products")

const productController = { 
    index: function(req,res){
        return res.render('product', {
            
        })
    },
    add: function(req,res){
        return res.render('productAdd', {
            
        })
    },
    search: function(req,res){
        return res.render('search', {
            
        })
    },
    edit: function(req,res){
        return res.render('productEdit', {
            
        })
    }
}

module.exports = productController; 