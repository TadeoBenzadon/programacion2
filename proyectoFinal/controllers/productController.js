/* const products = require("../db/products")
const comentarios = require("../db/comentarios")

const productController = {
    index: function (req, res) {
        return res.render('product', { productos: products.lista, comentarios: comentarios.lista })
    },
    add: function (req, res) {
        return res.render('productAdd', { productos: products.lista }
        )
    },
    search: function (req, res) {
        return res.render('search', { productos: products.lista })
    }
}

module.exports = productController; */



const db = require("../database/models")
const op = db.sequelize.op;

const productController ={
    show: function(req, res){
        let id = req.params.id

        db.Product.findByPk(id, {
            include: [
                {association: 'comments'},  
            ]
        })
        .then((data)=>{
            res.render('product', {product: data})
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    new: function(req, res){
        db.Product.findAll({
           order: [
               ['electro_year', 'DESC']
           ],
           limit: 2022,
        })
            .then(data =>{
                return res.render('new', {product: data, title: 'recomendado'})
            })
            .catch( error => {
                console.log(error);
            })
    },
    
    search: function(req, res){
        let infoABuscar = req.query.search; //obtengo la info de la querystring.
        db.Product.findAll({
            //SELECT * FROM products
            //WHERE title LIKE "%heladera%"
            where: [
                { electro_name: {[op.like]: '%'+infoABuscar+'%'}}
            ]})
            .then( data => {
                return res.render('index',{products: data});
            })
            .catch( error => {
                console.log(error);
            })
    },
    create: function(req, res){  //VERRRRRRRRRRR
            db.Comment.findAll()
                .then( data => {
                    return res.render('productNew', {Comment:data});
                })
                .catch(error => {
                    console.log(error);
                })

    }, 
    store: function(req, res){
        let data = req.body;
        let product = {
            electro_name: data. electro_name,            
            electro_description: data.electro_description,
            electro_variety: data.electro_variety,
            electro_year: data.electro_year,
            electro_image: data. electro_image,
            electro_comments: data.genre_id,
            created_at:data.created_at,
            updated_at:data.updated_at,
            user_id:data.user_id,
        } 
        db.Product.create(product)
            .then( (productCreada) => {
                return res.redirect('/');
            })
            .catch(error => {
                console.log(error);
            })
    },
}

module.exports = productController
/* Module.exports = {           VERRRRRRRRRRRRRR
    Index: (req, res) => {
        res.render('index')
    },
    listarProducto: (req, res) => {
        db.product.findAll({
            order: [
                ['nombre_id'= 'ASC']
            ],
            Limit: 3
        })
            .then((producto) => {
                res.send(producto)
            })
    },
    detalleProducto: (req, res) => {
        db.product.findByPk(re.params.id)
            .then(producto => {
                res.send(producto)
            })
    },
    buscarProducto: (req, res) => {
    db.product.findOne({
        where: [{
            title: req.params.title
        }]
    })
        .then(producto => {
            res.sen(producto)
        })
}

} */