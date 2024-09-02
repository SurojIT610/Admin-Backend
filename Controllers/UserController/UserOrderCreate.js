const mongoose = require('mongoose');
const OrderModel = require('../../Model/OrderModel'); // Adjust the path as necessary
const ProductModel = require('../../Model/ProductModel'); // Adjust the path as necessary
const UserModel = require('../../Model/UserModel'); // Adjust the path as necessary

// /**
//  * Create a new order.
//  * @param {Object} req - The request object.
//  * @param {Object} res - The response object used to send the response.
//  */
const createOrder = async (req, res) => {
    const { user, products, paymentInfo, shippingAddress } = req.body;

    try {
        // Log received user ID
        console.log('Received user ID:', user);

        // Check if user ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        // Verify that the user exists
        const userDoc = await UserModel.findById(user);
        if (!userDoc) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify that each product exists and is valid
        for (const product of products) {
            if (!mongoose.Types.ObjectId.isValid(product.product)) {
                return res.status(400).json({ message: `Invalid product ID format: ${product.product}` });
            }
            const prod = await ProductModel.findById(product.product);
            if (!prod) {
                return res.status(404).json({ message: `Product with ID ${product.product} not found` });
            }
        }

        // Create the order
        const newOrder = new OrderModel({
            user,
            products: products.map(product => ({
                product: product.product,
                quantity: product.quantity,
                price: product.price
            })),
            paymentInfo,
            shippingAddress
        });

        const savedOrder = await newOrder.save();

        return res.status(201).json(savedOrder);

    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { createOrder };