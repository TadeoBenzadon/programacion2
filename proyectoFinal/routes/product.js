var express = require('express');
const productController = require('../controllers/productController')
var router = express.Router();

/* GET home page. */
router.get('/', productController.index); 
router.get('/add', productController.add); 
router.get('/search', productController.search); 


module.exports = router;