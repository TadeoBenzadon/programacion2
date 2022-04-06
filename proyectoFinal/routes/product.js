var express = require('express');
const productController = require('../controllers/productController')
var router = express.Router();

/* GET home page. */
router.get('/', productController.index); 

module.exports = router;