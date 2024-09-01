const express = require('express');
const expSeller = express.Router();
const { createProduct, updateProduct, deleteProduct, getAllProducts } = require('../../Controllers/ProductControllers/productController');
// const authenticate = require('../../middleware/authenticate'); // Middleware for authentication
// const authorize = require('../../middleware/authorize'); // Middleware for role-based authorization

// Route to create a product (accessible by ADMIN and SELLER)
// router.post('/create-product', authenticate, authorize(['ADMIN', 'SELLER']), createProduct);
expSeller.post('/create-product', createProduct);

// Route to update a product (accessible by ADMIN and the seller who created the product)
expSeller.patch('/update-product/:id',  updateProduct);

// Route to delete a product (accessible by ADMIN and the seller who created the product)
expSeller.delete('/delete-product/:id', deleteProduct);

// Route to get all products (accessible by all authenticated users)
expSeller.get('/get-products',  getAllProducts);

module.exports = expSeller;
