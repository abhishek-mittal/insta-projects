'use strict';

const mongoose = require('mongoose');
const Driver = mongoose.model('Driver');

let driverData = [
    {
        fullName: 'Driver 1',
        email: 'drivermails1@gmal.com',
        phone: '9872387793',
        availableLocations: ['banglore', 'jaipur', 'dehradun', 'mumbai'],
        language: ['hindi', 'english', 'kannada']
    },
    {
        fullName: 'Driver 2',
        email: 'drivermails2@gmal.com',
        phone: '9872387793',
        availableLocations: ['banglore', 'jaipur', 'dehradun'],
        language: ['english']
    },
    {
        fullName: 'Driver 3',
        email: 'drivermails3@gmal.com',
        phone: '9872387793',
        availableLocations: ['banglore', 'jaipur'],
        language: [ 'english', 'kannada']
    },
    {
        fullName: 'Driver 4',
        email: 'drivermails4@gmal.com',
        phone: '9872387793',
        availableLocations: ['banglore', 'jaipur', 'dehradun'],
        language: ['hindi']
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