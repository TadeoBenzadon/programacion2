var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController')

const multer = require('multer')
const path = require('path');
const { Router } = require('express');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/images/'))
    },
    filename: (req, file, cb)=> {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })



router.get('/detail/:id', productController.show);
router.get('/edit/:id', productController.edit);
router.get('/edit', upload.single('electro_images'), productController.productUpdate); 
router.post('/edit', upload.single('electroImage'), productController.editForm);
router.get('/results/:search', productController.search); 
router.post('results', productController.searchResults)
router.get('/add', productController.create);
router.post('/add', upload.single('electroImage'), productController.productStore);
router.post('/delete/:id?', productController.destroy);
router.post('/comment', productController.createComment);
router.post('/comment/delete/:id?', productController.destroyComment);


module.exports = router;