const mongoose = require('mongoose');

const fixedPriceSchema = new mongoose.Schema(
    {
        fromCity: {
            type : String,
            required: true
        },
        toCity: {
            type : String,
            required: true
        },
        fixedPrice: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        autoIndex: true
    }
);


const FixedPrice = mongoose.model('FixedPrice', fixedPriceSchema, 'FixedPrice');
module.exports = FixedPrice;