var express = require('express');
const usuariosController = require('../controllers/usuariosController')
var router = express.Router();

/* GET home page. */
router.get('/', usuariosController.login); 
router.get('/register', usuariosController.register); 
router.get('/profile', usuariosController.profile); 
router.get('/profile/edit', usuariosController.profileEdit); 

module.exports = router;