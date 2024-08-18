const router = require('express').Router();
const productController = require('../controllers/product.controller');

router.post('/products', productController.createProduct);
router.get('/products', productController.getProduct);

module.exports = router;
