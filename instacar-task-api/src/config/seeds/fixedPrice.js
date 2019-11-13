'use strict';

const mongoose = require('mongoose');
const FixedPrice = mongoose.model('FixedPrice');

let fixedPriceData = [
    {
        fromCity: 'banglore',
        toCity: 'hyderabad',
        fixedPrice: 2000
    },
    {
        fromCity: 'banglore',
        toCity: 'mumbai',
        fixedPrice: 3000
    },
    {
        fromCity: 'banglore',
        toCity: 'Ooty',
        fixedPrice: 1500
    },
    {
        fromCity: 'banglore',
        toCity: 'chennai',
        fixedPrice: 9000
    }
]

module.exports = {
    seed: async () => {
        const fixedPrice = await FixedPrice.insertMany(fixedPriceData);
        if (!fixedPrice) {
            console.log('driver::Admin seed error!', err);
            return;
        }
        console.log('driver::Admin seeded!');
        return fixedPrice;
    }
}