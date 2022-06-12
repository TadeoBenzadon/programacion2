const bcrypt = require('bcryptjs');
const db = require("../database/models/"); 
//const op = db.Sequelize.Op;
const users = db.User; 

const usuariosController = { 
    login: function(req,res){
        user.findOne({
            where: {email: req.body.email}
        })
        .then(function(user){
            req.session.user = user
            res.cookie('userId', user.id, {maxAge: 1000*60*5})
            return res.redirect('/')
        })
        .catch(error => console.log(error))        
    }, 
    register: function(req,res){
        if(req.session.user !== undefined){
            return res.redirect('/')} // aca tendria que hacer que ya no haya registro, que haya logout
            else{
            return res.render('register');
            } 
            
    }, 
    store: function(req,res){
        if(req.body.email == ""){
            res.locals.message = "El email es obligatorio" 
            return res.render('register')
        }
        if(req.body.user == ""){
            res.locals.user = "El nombre de usuario es obligatorio" 
            return res.render('register')
        }
        else if(req.body.password == ""){
            res.locals.message = "La contraseña es obligatorio" 
            return res.render('register')
        }
        else if(req.body.password2 == ""){
            res.locals.message = "Reescribir la contraseña es obligatorio" 
            return res.render('register')
        }
        else if(req.password != req.password2){
            res.locals.message = "Las contraseñas no coinciden" 
            return res.render('register')
        }
        else if(req.file.mimetype !== 'image/png' && req.file.mimetype !=='image/jpg' && req.file.mimetype !=='image/jpeg'){
            res.locals.message = "El archivo debe ser png, jpg o jpeg"
            return res.render('register')
        }
        else {
            users.findOne({
                where: [{email: req.body.email}]
            })
            .then(function(user){
                if(user != null){
                    res.locals.message = "El email ya esta registrado" 
                    return res.render('register')
                }
                else{
                    let user = {
                        user: req.body.user,
                        email: req.body.email,
                        password: bcrypt.hashSync (req.body.password, 10),
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
            user: usuarios.lista[0].usuario,
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
           user: req.body.user, 
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