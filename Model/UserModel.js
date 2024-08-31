const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        fname: {
            type: String,
            required: true
        },
        lname: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    login: {
        type: Date,
        default: Date.now
    },
    logout: {
        type: Date,
        default: null
    },
    address: {
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
    paymentInfo: [{
        date: {
            type: Date,
            default: Date.now
        },
        time: {
            type: String // Assuming time is stored as a string, but you might want to adjust this based on your requirements
        },
        paymentId: {
            type: String,
            required: true
        },
        // Additional payment info fields can be added here
    }]
},{
    versionKey:false,
});

// Create a model using the schema
const UserModel = mongoose.model('UserModel', UserSchema, 'user' );

module.exports = UserModel;
console.log(`User schema ready to use`)
