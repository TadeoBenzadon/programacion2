const products = require("../database/models")
const comentarios = require("../database/models")

const productController = { 
    index: function(req,res){
     return res.render('product',  {productos: products.lista, comentarios: comentarios.lista })
    },
    add: function(req,res){
        return res.render('productAdd', {productos: products.lista}
    )
    },
    search: function(req,res){
        return res.render('search', {productos: products.lista})
    }
}

module.exports = productController; 