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
        /*let infoABuscar = req.query.search; //obtengo la info de la querystring.
      
        db.Product.findAll({
            //SELECT * FROM products
            //WHERE title LIKE "%heladera%"
                incule: [{
                    association: 'users'},
                    {association: 'comments',
                    include: {
                        association:'users'
                    }
                }],
                where: {
                    [op.or]: [{
                        
                        electro_name: {[op.like]: '%'+infoABuscar+'%'}
                    }, {
                        electro_description: {[op.like]: '%'+infoABuscar+'%'}
                    },
                ]
                },
                })

            .then( data => {
                console.log (data);
                if (data == null || data == []|| data.length == 0){
                    console.log ('no hay resultados')
                    return res.render ('index', {
                        title: 'Resultados | Janise Market',
                        products: data,
                        results: infoABuscar,
                        respuesta: 'no se hay resultados criterios para su criterio de busqueda',
                    })
                }
                return res.render('index',{products: data});
            })
            .catch( error => {
                console.log(error);
            })*/
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
    }, 
       
    

   /* createComment: function (req, res){
        let data = req.body;
        let errors = {}
           
        if (req.session.user != undefined){

                let createComment = {
                    product_id:data.products,
                    user_id:data.users,
                    texto_comentario: data.texto_comentario,
                }
        db.comment.create (createComment)
        .then (data=> {
            db.Prduct.findByPk(data.product_id)
            .then(result => {
                result.electro_comments +=1;
                result.save ()
                .then (info => {
                    return res.redirect ("/electro/description/"+ createComment.product_id)
                })
            })
        })
    } else {
            errors.message = 'para ingresar un comentario debe iniciar sesion'
            res.locals.errors = errors 
            return res.render ('login',{
                title: 'login | Janise Market'
            });
        }
    },

    destroy: function (req,res){
        let productBorrar = req.params.id;
        db. Product.destroy ({
            where: [{id: productBorrar}]
        })
        .then ((data)=> {
            return res.redirect ('/');
        })
        .catch (error => {
            console.log (error);
        })
    },
    destroyComment: function (req,res){
        let comentarioId =req.params.id;
        db.Comment.destroy ({
            where: [{
                id:comentarioId}]
        })
        .then(()=> {
            db.product.findByPk(req.body.product_id)
            .then (result =>{
                result.electro_comments -=1
                result.save()
                .then (info => {
                    return res.redirect ('/electro/description/'+req.body.product_id);
                })
            })
        })
        .catch (error => {
            console.log(error);
        })
    }*/
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