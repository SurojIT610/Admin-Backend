const express = require('express');
const expSeller = express.Router();
const { sellerManageOrder, sellerGetAllOrders } = require('../../Controllers/SellerController/SellerOrderManage');
const { createProduct, deleteProduct, updateProduct } = require('../../Controllers/ProductControllers/productController');
// const authenticateUser = require('../../middleware/authenticateUser'); // Ensure this middleware is in place

// Seller routes
expSeller.post('/orders/:id',  sellerManageOrder);
expSeller.get('/orders/:userId',  sellerGetAllOrders);// CHECKED 

expSeller.post(`/create-products`, createProduct) // CHECKED

// seller manage created product
expSeller.post(`/update-product/:id`, updateProduct) // CHECKED


// Seller routes for order management
expSeller.patch('/orders/:id', sellerManageOrder); // CHECKED

expSeller.delete(`/delete/:id`,deleteProduct) // CHECKED




module.exports = expSeller;
