const bcrypt = require('bcryptjs');
const db = require("../database/models"); 
//const op = db.Sequelize.Op;
const user = db.User; 


const usuariosController = { 
    login: function(req,res){
        // let errors = {};
        user.findOne({
            where: {email: req.body.email}
        })
        .then(function(user){
            req.session.user = userName
            res.cookie('userId', user.id, {maxAge: 1000*60*5})
            return res.redirect('/')
        })
        .catch(error => console.log(error))        
    }, 
    register: function(req,res){
return res.render('register');
     
            
    }, 
    store: function(req,res){
        let errors = {}
        if(req.body.email == ""){
            errors.message = "El email es obligatorio" ; 
            res.locals.errors = errors; 
            return res.render('register')
        }
        else if(req.body.user == ""){
            errors.message = "El nombre de usuario es obligatorio"  ; 
            res.locals.errors = errors; 
            return res.render('register')
        }
        else if(req.body.password == ""){
            errors.message = "La contraseña es obligatorio"  ; 
            res.locals.errors = errors; 
            return res.render('register')
        }
        else if(req.body.password2 == ""){
            errors.message = "Reescribir la contraseña es obligatorio"   ; 
            res.locals.errors = errors; 
            return res.render('register')
        }
        else if(req.password != req.password2){
            errors.message = "Las contraseñas no coinciden"    ; 
            res.locals.errors = errors; 
            return res.render('register')
        }
        else if(req.file.mimetype !== 'image/png' && req.file.mimetype !=='image/jpg' && req.file.mimetype !=='image/jpeg'){
            errors.message = "El archivo debe ser png, jpg o jpeg"   ; 
            res.locals.errors = errors;
            return res.render('register')
        }
        else {
            user.findOne({
                where: [{email: req.body.email}]
            })
            .then(function(user){
                if(user != null){
                    errors.message = "El email ya esta registrado"    ; 
                    res.locals.errors = errors;
                    return res.render('register')
                }
                else{
                    let user = {
                        email: req.body.email,
                        user: req.body.user,
                        password: bcrypt.hashSync (req.body.password, 10),
                        avatar: req.file.filename
                    } 
                    user.create(user)
                    .then(usuario => {
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