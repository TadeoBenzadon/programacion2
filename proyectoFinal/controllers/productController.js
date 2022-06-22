const db = require("../database/models"); 
const op = db.Sequelize.Op;
const Producto = db.Product;
const Comentarios = db.Comment;

const productController = {
    show: function (req, res) {
        let id = req.params.id

        Producto.findByPk(id, {
            include: [{
                association: 'comments', include: {association: 'user'}
            },
            {
                association: 'user'
            }
            ],
            order: [
                ['comments', 'id', 'desc']
            ],
        })
            .then(data => {
               // res.send(data)
                if (!data) {
                    res.redirect('/')
                }
                return res.render('product',
                    {
                        products: data,
                        title: 'Productos | Janise Market'
                    });
            })
            .catch(error => {
                console.log(error)
            })
    } ,
    edit: (req, res) => {
        Producto.findByPk(req.params.id)
            .then((data) => {
                if (!data) {
                    res.redirect('/')
                } else {
                return res.render('productEdit', {
                    title: 'Editar | Janise Market',
                    product: data,
                    id: req.params.id,
                })}
            })
    },

    editForm: (req, res) =>{

        let data = req.body;
        if (req.file != undefined) {
            var electro = {
                electro_name: data.electroName,
                electro_description: data.electroDescription,
                electro_image: req.file.filename,
            }
        } else {
            var electro = {
                electro_name: data.electroName,
                electro_description: data.electroDescription,
                electro_image: req.file.filename,
            }
        }
        Producto.update(electro, {
            where: {
                id: req.body.id
            }
        })
            .then(function (productUpdate) {
                console.log(productUpdate)
                return res.redirect('/')
            })
            .catch(error => {
                console.log(error);
            })
    },
    searchResults: (req, res) => {

        let infoABuscar = req.query.search; // Obtengo la info de la querystring.

        Producto.findAll({

            include: [{
                association: 'user'
            }, {
                association: 'comments',
                include: {
                    association: 'user'
                }
            }],

            where: {
                [op.or]: [{
                    electro_name: {
                        [op.like]: '%' + infoABuscar + '%'
                    }
                },
                {
                    electro_description: {
                        [op.like]: '%' + infoABuscar + '%'
                    }
                }
                ]
          }
        })
            .then(data => {
                console.log(data);
                if (data == null || data == [] || data.length == 0) {
                    //console.log('No hay resultados');
                    return res.render('search', {
                        title: 'Resultados |Janise Market',
                        respuesta: 'No se encontraron resultados para ' + infoABuscar, 
                        result: null , 
                        infoABuscar: infoABuscar
                    });
                }
                return res.render('search', {
                    title: 'Resultados | Janise Market',
                    products: data,
                    result: infoABuscar,
                    respuesta: ''
                });
            })
            .catch(error => {
                console.log(error);
            })

    },

    create: (req, res) => {
        // Renderizar la vista de Product Add
        if (req.session.user != undefined) {

            return res.render('productAdd', {
                title: 'Agregar | Janise Market',
            });
        } else {
            res.redirect('/')
        }
    },

    productStore: function (req, res) {
    

        let data = req.body;

        
        let electro = {
            electro_name: data.electroName,
            electro_description: data.electroDescription,
            electro_image: req.file.filename,
            electro_comments: 0,
            user_id: req.session.user.id
        }
      console.log(electro)
        Producto.create(electro)
            .then((electroCreado) => {
                //4)Redirección
                return res.redirect('/');
            })
            .catch(error => {
                console.log(error);
            })
    },

    createComment: function (req, res) {
        let data = req.body;
        let errors = {}

        if (req.session.user != undefined) {

            let createComment = {
                product_id: data.idProduct,
                user_id: req.session.user.id,
                texto_comentario: data.comment,
            }

            Comentarios.create(createComment)
                .then(data => {
                    return res.redirect("/product/detail/" + createComment.product_id)
                })
        } else {
            errors.message = 'Para ingresar un comentario debe iniciar sesión'
            res.locals.errors = errors
            return res.render('login', {
                title: 'Login | Janis Market'
            });
        }
    },

    destroy: function (req, res) {

        let electrodomesticoBorrar = req.params.id;
        Producto.destroy({
            where: [{
                id: electrodomesticoBorrar
            }]
        })
            .then((data) => {

                return res.redirect('/');

            })
            .catch(error => {
                console.log(error);
            })
    },
    destroyComment: function (req, res) {

        let comentarioId = req.params.id;
        Comentarios.destroy({
            where: [{
                id: comentarioId
            }]
        })
            .then(() => {
                Producto.findByPk(req.body.idProduct)
                    .then(result => {
                        result.electro_comments -= 1
                        result.save()
                            .then(info => {

                                return res.redirect('/product/detail/' + req.body.idProduct);
                            })
                    })
            })
            .catch(error => {
                console.log(error);
            })
    },
    productUpdate: function (req, res) {
        const id = req.params.id;
        Producto.findByPk(id)
            .then(data => {
                const productos = {
                    electro_name: req.body.electroName,
                    electro_image: "",
                    electro_description: req.body.electroDescription,
                }
                if (req.file == undefined) {
                    productos.electro_image = data.electroImages;
                } else {
                    productos.electro_image = req.file.filename;
                }

                Producto.update(product, {
                    where: {
                        product_id: id
                    }
                })
                    .then(function () {
                        return res.redirect("/")
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
    }
 


}

module.exports = productController;