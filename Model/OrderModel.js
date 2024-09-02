const mongoose = require('mongoose');

// Define the Order Schema
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel', // Reference to the User model
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductModel', // Reference to the Product model
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    paymentInfo: {
        paymentMethod: {
            type: String,
            enum: ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer'],
            required: true
        },
        paymentStatus: {
            type: String,
            enum: ['Pending', 'Completed', 'Failed'],
            default: 'Pending'
        },
        paymentId: {
            type: String,
            required: true
        },
        transactionDate: {
            type: Date,
            default: Date.now
        }
    },
    shippingAddress: {
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pin: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
}, { versionKey: false });

// Pre-save middleware to update `updatedAt` before saving
OrderSchema.pre('save', function (next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});

// Create a model using the schema
const OrderModel = mongoose.model('OrderModel', OrderSchema, 'Order');

module.exports = OrderModel;
