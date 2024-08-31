const express = require('express');
const { createProduct, updateProduct, getAllProducts } = require('../../Controllers/ProductControllers/productController'); // Adjust the path as necessary

const router = express.Router();

// Define the route for creating a product
router.post('/create-products', createProduct); // Using POST for create operations
router.post('/update-product', updateProduct); // Using POST for update operations
router.get('/', getAllProducts); // Using get for all products


module.exports = router;
