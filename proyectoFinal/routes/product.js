var express = require('express');
const productController = require('../controllers/productController')
var router = express.Router();

/* GET home page. 
router.get('/', productController.index); 
router.get('/add', productController.add); 
router.get('/search', productController.search); */
router.get('/detail/:id', productController.show);
router.get('/new', productController.new);
router.get('/search', productController.search); 
router.get('/recomended', productController.recomended); 
router.get('/create', productController.create); 
router.post('/store', productController.store); 


module.exports = router;