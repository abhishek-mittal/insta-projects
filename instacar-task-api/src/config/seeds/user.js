'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

let userData = {
    name: 'Abhishek Mittal',
    email: 'abhsihekmittaloffice@gmal.com',
    password: '1234',
    phone: '9872387793'
}

module.exports = {
    seed: () => {
        let user = new User(userData);
        return user.save()
            .then((user) => {
                console.log('User::Admin seeded!');
            })
            .catch((err) => {
                console.log('User::Admin seed error!', err);
            });
    }
}