const express = require('express');
const { getAllOrders } = require('../../Controllers/AdminController/AdminOrderController');
const { updateProduct, createProduct, getAllProducts, deleteProduct } = require('../../Controllers/ProductControllers/productController');
const expAdmin = express.Router();

// Define the route for creating a product
expAdmin.post('/products', createProduct); // POST for creating products

// Define the route for partially updating a product
expAdmin.patch('/products/:id', updateProduct); // PATCH for updating specific fields

// Define the route for getting all orders
expAdmin.get('/orders', getAllOrders);

// Optional: Define the route for getting all products (if needed)
expAdmin.get('/products', getAllProducts);

// Define the route for deleting a product
expAdmin.delete('/delete/:id', deleteProduct); // DELETE for deleting a product



module.exports = expAdmin;