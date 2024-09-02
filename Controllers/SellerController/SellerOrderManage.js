const mongoose = require('mongoose');
const OrderModel = require('../../Model/OrderModel'); // Adjust the path as necessary

// Seller Manage Order Controller
const sellerManageOrder = async (req, res) => {
    const { id } = req.params; // Get order ID from route parameters
    const { action, userId, ...updateData } = req.body; // Get action type, user ID, and updated data from request body

    try {
        // Validate required fields
        if (!id || !action || !userId) {
            return res.status(400).json({ message: 'Order ID, action type, and user ID are required' });
        }

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Find the order
        const order = await OrderModel.findById(id);

        // Check if the order was found
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if `sellerId` exists and compare with `userId`
        if (order.sellerId && order.sellerId.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Access denied. You are not authorized to manage this order.' });
        }

        // Validate action type
        const validActions = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
        if (!validActions.includes(action)) {
            return res.status(400).json({ message: 'Invalid action type. Valid actions are: Pending, Shipped, Delivered, Cancelled.' });
        }

        // Prepare update data for orderStatus
        let updateFields = { orderStatus: action };

        // Add other update data fields
        updateFields = { ...updateFields, ...updateData };

        // Find and update the order
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            id,
            updateFields,
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        // Check if `updatedOrder` was found and updated
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Respond with the updated order
        return res.status(200).json(updatedOrder);

    } catch (error) {
        // Handle any errors
        console.error('Error in sellerManageOrder:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Seller Get All Orders Controller
const sellerGetAllOrders = async (req, res) => {
    const { userId } = req.params;

    try {
        // Validate userId presence
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

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

module.exports = { sellerManageOrder, sellerGetAllOrders };
