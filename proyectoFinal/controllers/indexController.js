const products = require("../database/models");

const indexController = { 
    index: function(req,res){
        return res.render('index', {productos: products.lista})
    }
}

module.exports = indexController; 