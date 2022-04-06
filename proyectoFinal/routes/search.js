var express = require('express');
const searchController = require('../controllers/searchController')
var router = express.Router();

/* GET home page. */
router.get('/', searchController.index); 

module.exports = router;