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



const db = require("../database/models");
const products = require("../db/products");
const op = db.sequelize.Op;

const productController ={
    //index:hghgy,
    //add:jhjhj,
    show: function(req, res){
        let id = req.params.id

        db.Product.findByPk(id, {
            include: [{
                association: 'comments',
                include: { association: 'users'
            }
        },  
        {
            asossiarion: 'users'
        },
            ],
            order:[
                ['comments','id','desc']
            ],
        })
        .then((data)=>{
            if (!data){
                res.redirect ('/')
            }
           return res.render('product', 
            {product: data,
            title: 'peroductos | Janise Market'});
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    edit: (req, res)=> {
        db.Product.findByPk(req.params.id)
           .then ((data)=>{
               if(!data){
                   res.redirect('/')} else if (req.session.user.id != data.user_id){
                       res.redirect ('/usuarios'+ req.session.user.id)
                   }
                   return res.render ('product-edit', {
                       title: 'Editar | Janise Market',
                       product: data,
                       id: req.params.id,
                   })
           })
    },

    editForm: function (req, res) {

        let data = req.body;
        if (req.file != undefined){
            var products = {
             electro_name: data. electro_name,            
            electro_description: data.electro_description,
            electro_image: data. electro_image,
            electro_comments: data.electro_comments,
            created_at:data.created_at,
            updated_at:data.updated_at,
            user_id:data.user_id,
            }
        } else {
            var products = {
            electro_name: data. electro_name,            
            electro_description: data.electro_description,
            electro_comments: data.electro_comments,
            created_at:data.created_at,
            updated_at:data.updated_at,
            user_id:data.user_id,
            }
        }
        db.Product.update (products, {
            where: {
                id: req.body.id
            }
        })
        .then(function (productUpdate){
            console.log(productUpdate)
            return res.redirect ('/')
        })
        .catch (error => {
            console.log (error);
        })
    },
    
    search: function(req, res){
        return res.render ("searchResults", {db: db})
    },
    productStore: function (req, res){
        const errors ={}
        if (req.body.elecro_name==""){
            errors.message = "el nombre del producto es obligatorio";
            res.locals.errors= errors;
            return res.render ('productAdd')
        }else if (req.file.mimetype !=='image/png' && req.file.mimetype !== 'image/jpg'){
                errors.message = "el archivo debe ser jpg o png ";
                res.locals.errors= errors;
                return res.render ('productAdd')
        }else if (req.body.description=""){
            errors.message = "la descripcion del producto es obligatoria"; 
            res.locals.errors= errors;
            return res.render ('productAdd')
        }else {
            let producto = {
                electro_name: data. electroName,            
                electro_description: data.electroDescription,
                electro_image: req.file.filename,
                electro_comments: electroComments,
                user_id:data.user_id,
            } 
            Producto.create (producto)
            return res.redirect ("/")
        }
        /*let data = req.body;
        let product = {
            electro_name: data. electroName,            
            electro_description: data.electroDescription,
            electro_image: req.file.filename,
            electro_comments: electroComments,
            user_id:data.user_id,
        } 
        db.Product.create(product)
            .then( (productCreado) => {
                return res.redirect('/');
            })
            .catch(error => {
                console.log(error);
            })*/
    },

    create: function (req, res){
        if (req.session.user != undefined){
            return res.render ('productAdd',{
                title: 'Agregar | Janise Market',
            });}else{
                res.redirect ('/')
        }
    }, }

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