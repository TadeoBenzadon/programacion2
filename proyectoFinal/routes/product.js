var express = require('express');
const productController = require('../controllers/productController')
var router = express.Router();

const multer = require('multer')
const path = require('path')



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/images/products/'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })



router.get('/detail/:id', productController.show);
router.get('/edit', productController.edit);
router.get('/search', productController.search); 
router.get('/create', productController.create); 
router.post('/productStore', productController.productStore); 

module.exports = router;