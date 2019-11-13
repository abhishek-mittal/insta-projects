
const users = require('./user');
const drivers = require('./drivers');
const fixedPrice = require('./fixedPrice');

const seeders = [
    users,
    drivers,
    fixedPrice
];

module.exports = {
    run: () => {
        seeders.forEach((seeder) => {
            seeder.seed();
        });
    }
};
