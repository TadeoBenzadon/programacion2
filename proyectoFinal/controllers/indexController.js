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

           .then(function(nuevos) 
           {db.Product.findAll({
            order: [['electro_comments', 'DESC']],
            limit: 12, 
            include: [
                {association: 'user'},
                {association: 'comment',
                 include:{association: 'user'}}]
           }) 

           .then(function(comentados)
           {return res.render('index',{
               productos: nuevos,
               comentados: comentados,
               title: 'Janise Market'
           })})
           
           .catch(function(error){
               console.log(error);
           })
        })
    }
}

module.exports = indexController; 