const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller');
const products = [];

/***** router with controller  */

// admin/add-product => GET 
router.get('/add-product', productController.getAddProducts);

// admin/add-product => POST
router.post('/add-product', productController.postAddProducts);


exports.routes = router;
exports.products = products;