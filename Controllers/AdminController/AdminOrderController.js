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




// Admin Manage Order Controller
const adminManageOrder = async (req, res) => {
    const { id } = req.params; // Get order ID from route parameters
    const { action, ...updateData } = req.body; // Get action type and updated data from request body

    try {
        // Validate required fields
        if (!id || !action) {
            return res.status(400).json({ message: 'Order ID and action type are required' });
        }

        // Find the order to check if it exists
        const order = await OrderModel.findById(id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Determine action type and update or cancel the order
        let updatedOrder;
        if (action === 'update') {
            updatedOrder = await OrderModel.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true } // Return the updated document and run validators
            );
        } else if (action === 'cancel') {
            updatedOrder = await OrderModel.findByIdAndUpdate(
                id,
                { orderStatus: 'Cancelled' },
                { new: true, runValidators: true } // Return the updated document and run validators
            );
        } else {
            return res.status(400).json({ message: 'Invalid action type' });
        }

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Respond with the updated order data
        return res.status(200).json(updatedOrder);

    } catch (error) {
        // Handle any errors
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { getAllOrders,adminManageOrder};