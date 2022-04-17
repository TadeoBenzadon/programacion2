var express = require('express');
var router = express.Router();
const usuariosController = require('../controllers/usuariosController')

/* GET home page. */
router.get('/', usuariosController.login); 
router.get('/register', usuariosController.register); 
router.get('/profile', usuariosController.profile); 
router.get('/profile/edit', usuariosController.profileEdit); 

module.exports = router;