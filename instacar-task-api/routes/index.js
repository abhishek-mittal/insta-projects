var express = require('express');
var router = express.Router();




const mongoose = require('mongoose');
const Driver = mongoose.model('Driver');
const User = mongoose.model('User');
const Payments = mongoose.model('Payments');
const JourneyPlan = mongoose.model('JourneyPlan');

// import all controls
const driverC = require('./../src/controllers/drivers');
const locationC = require('./../src/controllers/location');
const paymentsC = require('./../src/controllers/payments');


const isAuthenticated = require('./../src/middlewares/isAuthenticated');
const auth = require('./../src/middlewares/authenticate');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// authentication routes
router.post('/login', auth.attemptLogin);

// all user routes
router.post('/user', [isAuthenticated, function (req, res, next) {
  console.log("data", req.user);
  res.json({ success: true });
}]);

// all drivers routes
router.post('/getDrivers', driverC.getAvailaibleDrivers);
router.get('/drivers', driverC.getAllDrivers);

// authenticated routes
router.post('/payment', [isAuthenticated, paymentsC.makePayment]);
router.get('/validate', [isAuthenticated, function (req, res, next) {
  res.json(({success: true}));
}]);

// utility routes
router.get('/getLocations', locationC.getLocationAutofill);

// seed route to set data entries
router.get('/seed', function (req, res, next) {
  require('./../src/config/seeds').run();
  res.json({ success: true });
});

module.exports = router;
