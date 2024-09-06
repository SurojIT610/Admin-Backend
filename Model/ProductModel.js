const mongoose = require('mongoose');

// Define the Product Schema
const ProductSchema = new mongoose.Schema({
    title: {
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
    discountPercentage: {
        type: Number,
        default: 0,
        min: 0 // Ensure discount percentage is not negative
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5 // Assuming a rating scale from 0 to 5
    },
    stock: {
        type: Number,
        required: true,
        min: 0 // Ensure stock is not negative
    },
    images: [String], // Array of image URLs
    thumbnail: {
        type: String,
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
    sku: {
        type: String,
        trim: true
    },
    weight: {
        type: Number,
        default: 0,
        min: 0 // Ensure weight is non-negative
    },
    dimensions: {
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
        depth: {
            type: Number,
            default: 0,
            min: 0 // Ensure depth is non-negative
        }
    },
    warrantyInformation: {
        type: String,
        trim: true
    },
    shippingInformation: {
        type: String,
        trim: true
    },
    availabilityStatus: {
        type: String,
        trim: true
    },
    returnPolicy: {
        type: String,
        trim: true
    },
    minimumOrderQuantity: {
        type: Number,
        default: 1,
        min: 1 // Ensure minimum order quantity is positive
    },
    meta: {
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        barcode: {
            type: String,
            trim: true
        },
        qrCode: {
            type: String,
            trim: true
        }
    },
    reviews: [{
        rating: {
            type: Number,
            min: 0,
            max: 5 // Assuming a rating scale from 0 to 5
        },
        comment: {
            type: String,
            trim: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        reviewerName: {
            type: String,
            trim: true
        },
        reviewerEmail: {
            type: String,
            trim: true
        }
    }],
    sellerId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        required: false // Only required if the user is a seller
    }
}, { versionKey: false });

// Create a model using the schema
const ProductModel = mongoose.model('ProductModel', ProductSchema, 'product');

module.exports = ProductModel;
