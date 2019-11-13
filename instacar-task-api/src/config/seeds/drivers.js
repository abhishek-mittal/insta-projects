'use strict';

const mongoose = require('mongoose');
const Driver = mongoose.model('Driver');

let driverData = [
    {
        fullName: 'Driver 1',
        email: 'drivermails1@gmal.com',
        phone: '9872387793',
        availableLocations: ['banglore', 'jaipur', 'dehradun', 'mumbai']
    },
    {
        fullName: 'Driver 2',
        email: 'drivermails2@gmal.com',
        phone: '9872387793',
        availableLocations: ['banglore', 'jaipur', 'dehradun']
    },
    {
        fullName: 'Driver 3',
        email: 'drivermails3@gmal.com',
        phone: '9872387793',
        availableLocations: ['banglore', 'jaipur']
    },
    {
        fullName: 'Driver 4',
        email: 'drivermails4@gmal.com',
        phone: '9872387793',
        availableLocations: ['banglore', 'jaipur', 'dehradun']
    }
]

module.exports = {
    seed: async () => {
        const driverRes = await Driver.insertMany(driverData);
        if (!driverRes) {
            console.log('driver::Admin seed error!', err);
            return;
        }
        console.log('driver::Admin seeded!');
        return driverRes;
    }
}