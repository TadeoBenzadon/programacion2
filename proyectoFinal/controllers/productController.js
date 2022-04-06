const data = require("../db/products")

const productController = { 
    index: function(req,res){
        return res.render('product', {
            
        })
    }
}

module.exports = productController; 