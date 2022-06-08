const bcrypt = require('bcryptjs');
const db = require("../database/models/"); 
//const op = db.Sequelize.Op;
const users = db.User; 

const usuariosController = { 
    login: function(req,res){
        return res.render('login', { 
        })
    }, 
    register: function(req,res){
        return res.render('register', {
        })
    }, 
    store: function(req,res){
        let errors = {}
        if(req.body.email == ""){
            res.locals.message = "El email es obligatorio" 
            console.log(errors)//guardar en locals
            return res.render('register')
        }
        else if(req.body.contraseña == ""){
            errors.message = "La contraseña es obligatorio" 
            console.log(errors)//guardar en locals
            return res.render('register')
        }
        else if(req.body.contraseña2 == ""){
            errors.message = "Reescribir la contraseña es obligatorio" 
            console.log(errors)//guardar en locals
            return res.render('register')
        }
        else if(req.password != req.contraseña2){
            errors.message = "Las contraseñas no coinciden" 
            console.log(errors)//guardar en locals
            return res.render('register')
        }
        else if(req.file.mimetype !== 'image/png' && req.file.mimetype !=='image/jpg' && req.file.mimetype !=='image/jpeg'){
            errors.message = "El archivo debe ser png, jpg o jpeg" 
            console.log(errors)//guardar en locals
            return res.render('register')
        }
        else {
            users.findOne({
                where: [{email: req.body.email}]
            })
            .then(function(user){
                if(user != null){
                    errors.message = "El email ya esta registrado" 
                    console.log(errors)//guardar en locals
                    return res.render('register')
                }
                else{
                    let user = {
                        usuario: req.body.usuario,
                        email: req.body.email,
                        password: bcrypt.hashSync (req.body.contraseña, 10),
                        avatar: req.file.filename
                    }
                    users.create(user)
                    .then(user => {
                        return res.redirect('/')
                    })
                    .catch(e=>{
                        console.log(e)
                    })
                }
            })
        }
    }, 
    profile: function(req,res){
        return res.render('profile', { 
            nombre: usuarios.lista[0].usuario,
            mail: usuarios.lista[0].email,
            fotoPerfil: usuarios.lista[0].fotoDePerfil
        })
    }, 
    profileEdit: function(req,res){
        let userId = req.params.userId;
        users.findByPk(userId)
            .then(function(user){
                return res.render('profileEdit', {profileEdit: user})
            })
        
    }, 
    profileUpdate: function(req,res){
        let user = {
           email: req.body.email, 
           usuario: req.bbody.user, 
           password: bcrypt.hashSync (req.body.password, 10), 
        }
        if(req.file == undefined){
            user.avatar = req.session.userAvatar
        } else{
            user.avatar = req.file.filename
        }

        users.update(user, {
            where: {
                id: req.session.userId
            }
        })
        .then(function(userId){
            user.id = req.session.userId
            return res.redirect('/')
        })

    }
}


module.exports = usuariosController; 