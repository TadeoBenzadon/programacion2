var express = require('express');
const indexController = require('../controllers/indexController')
var router = express.Router();

router.get('/', indexController.index); 

module.exports = router;

