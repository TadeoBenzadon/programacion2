const bcrypt = require('bcryptjs');
const db = require("../database/models"); 
const op = db.Sequelize.Op;
const Usuario = db.User; 


const usuariosController = { 
    login: function(req, res){
        return res.render('login');
    },
    signIn: function(req,res){
        // let errors = {};
        Usuario.findOne({
            where: { email: req.body.email}
        })
            .then(function(user){
                //return res.send(user)
                req.session.user = user

                //preguntar si el usuario tildó el checkbox 'recordarme''
                res.cookie('userId', user.id, {maxAge: 1000*60*5})
                return res.redirect('/')

            })
            .catch( error => console.log(error))        
    }, 
    register: function(req,res){
        if(req.session.user !== undefined){
            return res.redirect('/');   
        } 
        else{
            return res.render('register');
        }
    },
    store: (req, res) =>{
        let errors = {};
        if(req.body.user == ""){
            errors.register = "Nombre no puede estar vacio"
            res.locals.errors = errors
            return res.render('register')
        }else if(req.body.email == ""){
            errors.register = "Email no puede estar vacio"
            res.locals.errors = errors
            return res.render('register')
        }else if (req.body.password == ""){
            errors.register = "Contraseña no puede estar vacio"
            res.locals.errors = errors
            return res.render('register')
        } else if (req.body.password.length < 4){
            errors.register = "Contraseña debe tener más de 3 caracteres"
            res.locals.errors = errors
            return res.render('register')
        }else if(req.body.password2 == ""){
            errors.register = "Re escribir contraseña no puede estar vacio"
            res.locals.errors = errors
            return res.render('register')
        } else {
           Usuario.findOne({where: [{ email : req.body.email}]})
            .then( user => {
                if(user !=null){
                    errors.register = "Email ya existe"
                    res.locals.errors = errors
                    return res.render('register')
                } else if(req.body.password != req.body.password2 ) {
                    errors.register = "Las contraseñas no coinciden"
                    res.locals.errors = errors
                    return res.render('register')
                } else {
                    let usuario = {
                        email: req.body.email,
                        user:req.body.user,
                        password: bcrypt.hashSync(req.body.password, 10),
                        avatar: req.file.filename,
                        birthday:req.body.birthday,
                    }
                    console.log(usuario)
                    Usuario.create(usuario)
                        .then(user => {
                            return res.redirect('/usuarios')
                            //console.log(user)
                        })
                        .catch( err => console.log(err))
                }
            })
            .catch( err => console.log(err))
        }
    },
    profile: function(req,res){
        let id = req.session.user.id
        Usuario.findByPk(id , {
        include:[{
            association: 'products'
        }]
        })
        .then(data => {
            res.render('profile', {
            products: data,
            user: Usuario.user,
            userId: Usuario.id,
            email: Usuario.email,
            avatar: Usuario.avatar 
            })
        })
        .catch(e=>{
            console.log(e)
        })
       
    
    }, 
    profileEdit: function(req, res){
        let userId = req.params.userId;

        // Controlar que solo yo puedo cambiar los datos
        Usuario.findByPk(userId)
            .then(function(user){
                return res.render('profileEdit', {user: user})
            })
            .catch( e => {
                console.log(e)
            })
    },
    profileUpdate: function(req, res){
        console.log(req.body)
        let user = {
            user: req.body.user,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        }

        if(req.file == undefined){
            user.avatar = 'avatar-1654086189266.jpg'
        } else {
            user.avatar = req.file.filename;
        }

        Usuario.update(user, {
            where: {
                id: req.session.user.id  // Tiene que ser el usuario de session
            }
        })
            .then(function(user){
                // Manejar la session
                return res.redirect('/')
            })
            .catch( function(err) {
                console.log(err)
            })

    }
}


module.exports = usuariosController; 