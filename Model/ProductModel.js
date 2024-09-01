const mongoose = require('mongoose');

// Define the Product Schema
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Ensure price is not negative
    },
    stock: {
        type: Number,
        required: true,
        min: 0 // Ensure stock is not negative
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5 // Assuming a rating scale from 0 to 5
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    brand: {
        type: String,
        trim: true
    },
    tags: [String], // Array of tags or keywords related to the product
    dimensions: {
        length: {
            type: Number,
            default: 0,
            min: 0 // Ensure length is non-negative
        },
        width: {
            type: Number,
            default: 0,
            min: 0 // Ensure width is non-negative
        },
        height: {
            type: Number,
            default: 0,
            min: 0 // Ensure height is non-negative
        },
        unit: {
            type: String,
            default: 'cm', // Default unit of measurement
            enum: ['cm', 'm', 'inch'] // Allowed units
        }
    },
    weight: {
        type: Number,
        default: 0,
        min: 0 // Ensure weight is non-negative
    },
    warranty: {
        type: String,
        trim: true
    },
    manufacturer: {
        name: {
            type: String,
            trim: true
        },
        contact: {
            type: String,
            trim: true
        }
    },
    supplier: {
        name: {
            type: String,
            trim: true
        },
        contact: {
            type: String,
            trim: true
        }
    },
    sales: {
        totalSales: {
            type: Number,
            default: 0,
            min: 0 // Ensure total sales is non-negative
        },
        lastSold: {
            type: Date,
            default: null
        }
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        required: false // Only required if the user is a seller
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

// Create a model using the schema
const ProductModel = mongoose.model('ProductModel', ProductSchema, 'product');

module.exports = ProductModel;