const mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = () => {
    if (process.env.ENV === 'development') {
        mongoose.set('debug', true);
    }

    if (process.env.ENV == 'production') {
    }

    mongoose.connect(process.env.DB_URL, {}, (err) => {
        if (err) console.log('MongoDB connect Error:', err);
    });

    mongoose.connection.on('connected', function () {
        console.log('[1]Mongoose connection open to ' + process.env.DB_URL.split('/').pop());
    });

    mongoose.connection.once('open', () => {
        console.log('[1]Connected to mongodb!');
    });

    mongoose.connection.on('error', function (err) {
        console.error('[1]Mongoose default error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
        console.log('[1]Mongoose default connection disconnected');
    });

}