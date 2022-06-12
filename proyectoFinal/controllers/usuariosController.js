const bcrypt = require('bcryptjs');
const db = require("../database/models"); 
//const op = db.Sequelize.Op;
const users = db.User; 
const products = db.Product; 


const usuariosController = { 
    login: function(req,res){
        users.findOne({
            where: {email: req.body.email}
        })
        .then(function(user){
            req.session.users = userName
            res.cookie('userId', user.id, {maxAge: 1000*60*5})
            return res.redirect('/')
        })
        .catch(error => console.log(error))        
    }, 
    register: function(req,res){
        if(req.session.users !== undefined){
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
            res.locals.message = "El nombre de usuario es obligatorio" 
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
                        userName: req.body.user,
                        email: req.body.email,
                        password: bcrypt.hashSync (req.body.password, 10),
                        avatar: req.file.filename
                    }
            .catch(e=>{
                console.log(e)
            })   
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
        let id = req.session.users.id
        users.findByPk(id , {
        where:[{
            association: 'products'
        }]
        })
        .then(products => {
            res.render('profile', {
            user: users.userName,
            email: users.email,
            avatar: users.avatar, 
            products: products
            })
        })
        .catch(e=>{
            console.log(e)
        })
            
    
    }, 
    profileEdit: function(req,res){
        let userId = req.params.userId;
        users.findByPk(userId)
            .then(function(user){
                return res.render('profileEdit', {profileEdit: user})
            })
            .catch(e=>{
                console.log(e)
            })
        
    }, 
    profileUpdate: function(req,res){
        let user = {
           email: req.body.email, 
           userName: req.body.user, 
           password: bcrypt.hashSync (req.body.password, 10), 
        }
        if(req.file == undefined){
            userAvatar = req.session.users.avatar
        } else{
            userAvatar = req.file.filename
        }

        users.update(user, {
            where: {
                id: req.session.users.id
            }
        })
        .then(function(userId){
            userId = req.session.users.id
            return res.redirect('/')
        })
        .catch(e=>{
            console.log(e)
        })

    }
}


module.exports = usuariosController; 