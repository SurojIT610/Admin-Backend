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
    const { user_id, products, paymentInfo, shippingAddress } = req.body;

    try {
        // Check if user_id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        // Verify that the user exists
        const user = await UserModel.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify that each product exists and is valid
        for (const product of products) {
            if (!mongoose.Types.ObjectId.isValid(product.productId)) {
                return res.status(400).json({ message: `Invalid product ID format: ${product.productId}` });
            }
            const prod = await ProductModel.findById(product.productId);
            if (!prod) {
                return res.status(404).json({ message: `Product with ID ${product.productId} not found` });
            }
        }

        // Create the order
        const newOrder = new OrderModel({
            user: user_id,
            products: products.map(product => ({
                product: product.productId,
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
