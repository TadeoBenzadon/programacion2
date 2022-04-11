const usuarios = require("../db/usuarios")

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
            nombre: usuarios.lista[0].usuario,
            mail: usuarios.lista[0].email,
            fotoPerfil: usuarios.lista[0].fotoDePerfil
        })
    }, 
    profileEdit: function(req,res){
        return res.render('profileEdit', {
            nombre: usuarios.lista[0].usuario,
            mail: usuarios.lista[0].email,
            fotoPerfil: usuarios.lista[0].fotoDePerfil
        })
    }, 
}

module.exports = usuariosController; 