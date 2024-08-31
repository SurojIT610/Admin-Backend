const express = require('express');
const { getAllOrders } = require('../../Controllers/AdminController/AdminOrderController');
const expAdmin = express.Router();



// Route for admins to get all orders (Ensure this route is protected and only accessible by admins)
expAdmin.get('/orders', getAllOrders);

module.exports=expAdmin