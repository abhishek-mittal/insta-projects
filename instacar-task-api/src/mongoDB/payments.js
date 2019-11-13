const mongoose = require('mongoose');

const paymentsSchema = new mongoose.Schema(
    {
        gateway: {
            type: String,
            trim: true,
            default: ''
        },
        journeyCost: {
            type: String
        }
        // cardetails: {
        //     cvv: {
        //         type: String,
        //         required: true
        //     },
        //     cardNumber: {
        //         type: String,
        //         required: true
        //     },
        //     validTill: {
        //         type: String,
        //         required: true
        //     },
        //     nameOnCard: { 
        //         type: String,
        //         required: true
        //     }
        // }
    },
    {
        timestamps: true,
        autoIndex: true
    }
);


const Payments = mongoose.model('Payments', paymentsSchema, 'payments');
module.exports = Payments;