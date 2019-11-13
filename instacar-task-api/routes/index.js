var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
fetch.Promise = Promise;

const mongoose = require('mongoose');
const Driver = mongoose.model('Driver');
const User = mongoose.model('User');
const Payments = mongoose.model('Payments');
const JourneyPlan = mongoose.model('JourneyPlan');
const FixedPrice = mongoose.model('FixedPrice');



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/seed', function (req, res, next) {
  require('./../src/config/seeds').run();
  res.json({ success: true });
});

router.post('/user', function (req, res, next) {
  console.log(req.body);
  res.json({ success: true });
});

function getAvailableKey(value = '') {
  if (!value) {
      return value;
  }
  value = value.toLowerCase();
  const keys = value.trim().split(', ').reverse().splice(0, 3) || [];
  console.log(keys[keys.length - 1]);
  return keys[keys.length - 1];

}

var rad = function (x) {
  return x * Math.PI / 180;
};

// thanks to: https://stackoverflow.com/a/1502821/10791417
var getDistance = function (p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

router.post('/getDrivers', async function (req, res, next) {


  let availableDrivers = [];

  const { goingTo, departFrom, departDate, returnDate, journeyType } = req.body;
  goingToCity = getAvailableKey(goingTo);
  departFromCity = getAvailableKey(departFrom);

  const finalKey = typeof departFrom === 'string' ? departFromCity : address;
  availableDrivers = await Driver.find({ availableLocations: { $in: [finalKey], $not: { $size: 0 } } }).lean().limit(3);

  if (journeyType === 'ONE_WAY') {
    const finalPrice = await FixedPrice.findOne({ fromCity: departFromCity, toCity: goingToCity }).lean();
    availableDrivers.map(driver => {
      driver['calculatedFare'] = finalPrice.fixedPrice;
      return driver;
    });
    console.log(finalPrice, '::');
  }

  if (journeyType === 'ROUND_TRIP') {
    const peakPoints = [goingTo, departFrom]
      .map(call => fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${call || ''}&v=3&key=${process.env.GMAP_API_KEY}&libraries=geometry`)
        .then(r => r.json())
        .then(res => ((res && res.results && res.results[0] && res.results[0].geometry && res.results[0].geometry.location) || null))
      );

    let finalDetailObject = await Promise.all(peakPoints);

    let distanceInKM = getDistance(...finalDetailObject) / 1000;
    distanceInKM = distanceInKM < 300 ? 300 : distanceInKM;
    availableDrivers.map(driver => {
      driver['calculatedFare'] = driver.driverPricePerKM * distanceInKM;
      console.log('dd: ', driver['calculatedFare']);
      return driver;
    });

  }

  if (journeyType === 'MULTI_CITY') {

  }


  // calculating distance




  if (!availableDrivers) {
    res.json({ success: false, data: null });
  }
  res.json({ success: true, data: availableDrivers });
});

router.get('/drivers', async function (req, res, next) {
  const drivers = await Driver.find({});
  res.json({ success: true, drivers });
})

router.post('/login', function (req, res, next) {
  console.log(req.body);
  res.json({ success: true });
});

router.post('/payment', function (req, res, next) {
  console.log(req.body);
  res.json({ success: true });
});

router.get('/getLocations', async function (req, res, next) {
  const { address } = req.query;
  console.log(address, process.env.GMAP_API_KEY);

  const addresses = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address || ''}&v=3&key=${process.env.GMAP_API_KEY}&libraries=geometry`).then(r => r.json())

  if (!addresses && !addresses.lengths) {
    res.json({ success: false, data: [] });
  }
  res.json({ success: true, data: addresses.predictions });
})

module.exports = router;
