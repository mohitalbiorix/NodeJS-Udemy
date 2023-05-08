const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller');
const products = [];

/***** router with controller  */

// admin/add-product => GET 
router.get('/add-product', productController.getAddProducts);

// admin/products => GET 
router.get('/products', productController.getProducts);

// admin/add-product => POST
router.post('/add-product', productController.postAddProduct);

router.get('/edit-product/:productId', productController.getEditProduct);

router.post('/edit-product', productController.postEditProduct);

router.post('/delete-product', productController.postDeleteProduct);


module.exports = router;
// exports.products = products;