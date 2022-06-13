var express = require ('express');
const indexController = require('../controllers/indexController')
var router = express.Router();

router.get('/', indexController.index); 
/* router.get ('/listado-productos',indexController.listarproductos);
router.get ('/detalle-productos/:id', indexController.detalleproductos);
router.get ('/buscar-productos/:title', indexController.buscarproductos); */



module.exports = router;

