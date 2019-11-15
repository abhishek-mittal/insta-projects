'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

let userData = [
    {
        fullName: 'Abhishek Mittal',
        email: 'abhsihekmittaloffice@gmal.com',
        password: '1234',
        phone: '9872387793'
    },
    {
        fullName: 'A Real Traveler',
        email: 'art@aol.com',
        password: '1234',
        phone: '999998888'
    },
    {
        fullName: 'Koi bohot bara naam',
        email: 'kbbn@gmal.com',
        password: '1234',
        phone: '111111122'
    },
]

module.exports = {
    seed: async () => {
        let user = await User.insertMany(userData);
        return user.save()
            .then((user) => {
                console.log('User::Admin seeded!');
            })
            .catch((err) => {
                console.log('User::Admin seed error!', err);
            });
    }
}