const OrderModel = require('../../Model/OrderModel'); // Adjust the path as necessary

/**
 * Get all orders for a specific user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send the response.
 */
// order historyu of user
const getUserOrderHistory = async (req, res) => {
    const userId = req.params.userId; // Assume userId is passed as a URL parameter

    try {
        // Retrieve all orders for the specified user
        const orders = await OrderModel.find({ user: userId })
            .populate('user', 'fname lname email') // Populate user details
            .populate('products.product', 'name price') // Populate product details
            .exec();

        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        return res.status(200).json(orders);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


// get all order history only for admin



module.exports = { getUserOrderHistory };
