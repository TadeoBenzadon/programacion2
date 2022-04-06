var express = require('express');
const profileController = require('../controllers/profileController')
var router = express.Router();

/* GET home page. */
router.get('/', profileController.index); 

module.exports = router;