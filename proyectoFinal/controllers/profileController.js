const data = require("../db/usuarios")

const profileController = { 
    index: function(req,res){
        return res.render('profile', {
            
        })
    }
}

module.exports = profileController; 