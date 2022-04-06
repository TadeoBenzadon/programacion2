var express = require('express');
const profileEditController = require('../controllers/profileEditController')
var router = express.Router();

/* GET home page. */
router.get('/', profileEditController.index); 

module.exports = router;