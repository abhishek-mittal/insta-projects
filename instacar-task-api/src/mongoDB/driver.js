const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            trim: true,
            default: ''
        },
        email: {
            type: String,
            trim: true,
            required: true,
            lowercase: true,
            unique: true
        },
        phone: {
            type: String,
            trim: true,
            default: ''
        },
        availableLocations: {
            type: Array,
            default: ['banglore', 'jaipur', 'dehradun', 'mumbai']
        },
        language: {
            type: mongoose.Schema.Types.Array,
            default: []
        },
        driverPricePerKM: {
            type: Number,
            default: 15,
            curreny: 'inr'
        }
    },
    {
        timestamps: true,
        autoIndex: true
    }
);


const Driver = mongoose.model('Driver', driverSchema, 'drivers');
module.exports = Driver;