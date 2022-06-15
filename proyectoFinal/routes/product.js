var express = require('express');
const productController = require('../controllers/productController')
var router = express.Router();

/* GET home page. */
//router.get('/', productController.index); 
//router.get('/add', productController.add); 
router.get('/detail/:id', productController.show);
router.get('/edit', productController.edit);
router.get('/search', productController.search); 
router.get('/create', productController.create); 
router.post('/productStore', productController.productStore); 

module.exports = router;