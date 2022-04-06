var express = require('express');
const registerController = require('../controllers/registerController')
var router = express.Router();

/* GET home page. */
router.get('/', registerController.index); 

module.exports = router;