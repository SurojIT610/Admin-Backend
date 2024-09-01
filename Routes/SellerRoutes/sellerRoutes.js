const express = require('express');
const expSeller = express.Router();
const { sellerManageOrder, sellerGetAllOrders } = require('../../Controllers/SellerController/SellerOrderManage');
const { createProduct, deleteProduct } = require('../../Controllers/ProductControllers/productController');
// const authenticateUser = require('../../middleware/authenticateUser'); // Ensure this middleware is in place

// Seller routes
expSeller.post('/orders/:id',  sellerManageOrder);
expSeller.get('/orders',  sellerGetAllOrders);

expSeller.post(`/create-products`, createProduct)

expSeller.delete(`/delete/:id`,deleteProduct)

module.exports = expSeller;
