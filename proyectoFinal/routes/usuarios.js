var express = require('express');
var router = express.Router();
let multer = require('multer');
let path = require('path'); 
const usuariosController = require('../controllers/usuariosController')

//config de multer 
let storage = multer.diskStorage({
    destination: function(request, file, cb){
        cb(null, path.join(__dirname, '../public/stylesheets/images/avatars'))
    }, //a donde se suben los archivos 
    filename: function(request, file, cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    } // nombre del archivo 
}) 
let upload = multer({storage: storage})

/* GET home page. */
router.get('/', usuariosController.login); 
router.get('/register', usuariosController.register); 
router.post('/register', upload.single('avatar'), usuariosController.store); 
router.get('/profile', usuariosController.profile); 
router.get('/profile/edit', usuariosController.profileEdit); 

module.exports = router;