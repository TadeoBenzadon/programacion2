
const db = require("../database/models")
const op= db.sequelize.Op

const indexController = {
    index: function(req,res){
            db.Product.findAll({
                 include: [{
                    association: 'user'},
                    {association: 'comments'}
                ],
                order: [['created_at', 'DESC']] 
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


module.exports = indexController 