
const db = require("../database/models");

const op = db.sequelize.Op;

const productController = {
    show: function (req, res) {
        let id = req.params.id

        db.Product.findByPk(id, {
            include: [{
                association: 'comment',
                include: {
                    association: 'user'
                }
            },
            {
                asossiation: 'user'
            },
            ],
            order: [
                ['comment', 'id', 'desc']
            ],
        })
            .then(data => {
                if (!data) {
                    res.redirect('/')
                }
                return res.render('product',
                    {
                        product: data,
                        title: 'peroductos | Janise Market'
                    });
            })
            .catch(error => {
                console.log(error)
            })
    },
    edit: (req, res) => {
        db.Product.findByPk(req.params.id)
            .then((data) => {
                if (!data) {
                    res.redirect('/')
                } else if (req.session.user.id != data.user_id) {
                    res.redirect('/usuarios/' + req.session.user.id)
                }
                return res.render('productEdit', {
                    title: 'Editar | Janise Market',
                    product: data,
                    id: req.params.id,
                })
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
        db.Product.update(electro, {
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

    search: (req, res) => {

        let infoABuscar = req.query.search; // Obtengo la info de la querystring.

        db.Product.findAll({

            include: [{
                association: 'user'
            }, {
                association: 'comment',
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
                ]
            },

        })
            .then(data => {
                console.log(data);
                if (data == null || data == [] || data.length == 0) {
                    console.log('No hay resultados');
                    return res.render('searchResults', {
                        title: 'Resultados |Janise Market',
                        products: data,
                        result: infoABuscar,
                        respuesta: 'No se encontraron resultados para ' //terminar
                    });

                }
                return res.render('searchResults', {
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

            return res.render('product-add', {
                title: 'Agregar | Janise Market',
            });
        } else {
            res.redirect('/')
        }
    },

    productStore: function (req, res) {
        // Método para guardar nuevo Vino.
        //1) Obtener datos del formulario

        let data = req.body;

        //2) Crear vino nuevo.
        let electro = {
            electro_name: data.electroName,
            electro_description: data.electroDescription,
            electro_image: req.file.filename,
            electro_comments: 0,
            user_id: res.locals.user.id

        }
        //3) Guardar Vino
        db.Product.create(electro)
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
                user_id: data.idUser,
                texto_comentario: data.comment,
            }

            db.Comment.create(createComment)
                .then(data => {


                    db.Product.findByPk(data.product_id)
                        .then(result => {
                            result.electro_comments += 1;
                            result.save()
                                .then(info => {

                                    return res.redirect("/product/detail/" + createComment.product_id)
                                })

                        })


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
        db.Product.destroy({
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
        db.Comment.destroy({
            where: [{
                id: comentarioId
            }]
        })
            .then(() => {
                db.Product.findByPk(req.body.idProduct)
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
        Product.findByPk(id)
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

                productos.update(product, {
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