const data = require("../db/usuarios")

const usuariosController = { 
    login: function(req,res){
        return res.render('login', {
            
        })
    }, 
    register: function(req,res){
        return res.render('register', {
            
        })
    }, 
    profile: function(req,res){
        return res.render('profile', {
            
        })
    }, 
    profileEdit: function(req,res){
        return res.render('profileEdit', {
            
        })
    }, 
}

module.exports = usuariosController; 