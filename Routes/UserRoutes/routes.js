const express = require('express');
const { userlogin, userSignup, updateUser } = require("../../Controllers/UserController/UserAuthController");
const { createOrder } = require('../../Controllers/UserController/UserOrderCreate');
const { getUserOrderHistory } = require('../../Controllers/OrderController/OrderController');

const exp = express.Router();

// Use POST for sign-in and sign-up
exp.post('/sign-in', userlogin);  // CHECKED
exp.post('/sign-up', userSignup);  // CHECKED

exp.post(`/place-order`,createOrder)  // CHECKED


// updating user data

exp.patch('/update/:id',  updateUser);  // CHECKED

// Route for users to get their order history
exp.get('/order-history/:userId', getUserOrderHistory); // CHECKED

module.exports = exp;