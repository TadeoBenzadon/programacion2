var express = require('express');
const comentariosController = require('../controllers/comentariosController')
var router = express.Router();

/* GET home page. */
router.get('/', comentariosController.index); 

module.exports = router;