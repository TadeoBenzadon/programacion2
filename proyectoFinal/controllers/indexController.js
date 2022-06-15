const products = require("../db/products");
const db = require('../database/models')

const indexController = { 
    index: function(req,res){
        products.findAll({
            include:[
            {
             association: 'users'},
            {association: 'comments'}
            ],
            order: [['created_at', 'DESC']]
        })
        .then (data => {
            return res.render ('index',  '')
        })
        .catch (error=> {
            console.log (error)
        })
    }

    }
module.exports = indexController; 