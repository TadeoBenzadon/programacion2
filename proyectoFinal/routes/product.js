var express = require('express');
const productController = require('../controllers/productController')
var router = express.Router();

/* GET home page. 
router.get('/', productController.index); 
router.get('/add', productController.add); 
router.get('/search', productController.search); */
router.get('/detail/:id', productController.show);
router.get('/edit', productController.edit);
router.get('/search', productController.search); 
router.get('/create', productController.create); 
router.post('/store', productController.store); 
router.get('/createComment', productController.createComment); 
router.get('/destroy', productController.destroy); 
router.post('/destroyComment', productController.destroyComment); 



module.exports = router;