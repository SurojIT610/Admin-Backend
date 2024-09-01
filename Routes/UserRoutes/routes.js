const express = require('express');
const { userlogin, userSignup, updateUser } = require("../../Controllers/UserController/UserAuthController");
const { createOrder } = require('../../Controllers/UserController/UserOrderCreate');
const { getUserOrderHistory } = require('../../Controllers/OrderController/OrderController');

const exp = express.Router();

// Use POST for sign-in and sign-up
exp.post('/sign-in', userlogin);
exp.post('/sign-up', userSignup);

exp.post(`/place-order`,createOrder)


// updating user data

exp.patch('/update',  updateUser);

// Route for users to get their order history
exp.get('/order-history/:userId', getUserOrderHistory);

module.exports = exp;