const OrderModel = require('../../Model/OrderModel'); // Adjust the path as necessary

const getAllOrders = async (req, res) => {
    try {
        // Retrieve all orders
        const orders = await OrderModel.find({})
            .populate('user', 'fname lname email') // Populate user details
            .populate('products.product', 'name price') // Populate product details
            .exec();

        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found' });
        }

        return res.status(200).json(orders);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { getAllOrders };
