var express = require('express');
var router = express.Router();
const productController = require('../controllers/indexController')

const multer = require('multer')
const path = require('path')



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/images/'))
    },
    filename: (req, file, cb)=> {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })


/*
router.get('/detail/:id', productController.show);
router.get('/product/edit/:id', productController.edit);
router.post('/product/edit', upload.single('electroImage'), productController.editForm);
router.get('/results', productController.search); 
router.get('/product/add', productController.create);
router.post('/product/add', upload.single('electroImage'), productController.productStore);
router.post('/delete/:id?', productController.destroy);
router.post('/comment', productController.createComment);
router.post('/comment/delete/:id?', productController.destroyComment);
router.get('/product/edit', upload.single('electro_images'), productController.productUpdate);*/

module.exports = router;