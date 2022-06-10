var express = require ('express');
const indexController = require('../controllers/indexController')
var router = express.Router();

router.get('/', indexController.index); 
router.get ('/listado-productos',controller.listarproductos);
router.get ('/detalle-productos/:id', controller.detalleproductos);
router.get ('/buscar-productos/:title', controller.buscarproductos);



module.exports = router;

