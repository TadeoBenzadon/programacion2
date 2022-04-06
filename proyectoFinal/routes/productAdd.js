var express = require('express');
const productAddController = require('../controllers/productAddController')
var router = express.Router();

/* GET home page. */
router.get('/', productAddController.index); 

module.exports = router;