const OrderModel = require('../../Model/OrderModel'); // Adjust the path as necessary

// Seller Manage Order Controller
const sellerManageOrder = async (req, res) => {
    const { id } = req.params; // Get order ID from route parameters
    const { action, ...updateData } = req.body; // Get action type and updated data from request body
    const userId = req.user._id; // Get the user ID from the authenticated user

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

        // Check if the seller is authorized to update or cancel this order
        if (order.sellerId.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Access denied. You are not authorized to manage this order.' });
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


// Seller Get All Orders Controller
const sellerGetAllOrders = async (req, res) => {
    const userId = req.user._id; // Get the user ID from the authenticated user

    try {
        // Retrieve all orders related to the seller
        const orders = await OrderModel.find({ sellerId: userId });

        // Respond with the list of orders
        return res.status(200).json(orders);

    } catch (error) {
        // Handle any errors
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { sellerManageOrder ,sellerGetAllOrders};
