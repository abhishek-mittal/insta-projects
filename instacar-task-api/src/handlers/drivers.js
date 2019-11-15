const mongoose = require('mongoose');
const Driver = mongoose.model('Driver');
const FixedPrice = mongoose.model('FixedPrice');


const { geoUtil, calc } = require('./utils');

exports.getAvailaibleDrivers = async (journeyDetails) => {
    // set the final result
    let availableDrivers = [];
    const { goingTo, departFrom, departDate, returnDate, journeyType } = journeyDetails;

    goingToCity = geoUtil.getPresentCity(goingTo);
    departFromCity = geoUtil.getPresentCity(departFrom);

    const finalKey = typeof departFrom === 'string' ? departFromCity : address;
    // 3 available drivers to show to client
    availableDrivers = await Driver.find({ availableLocations: { $in: [finalKey], $not: { $size: 0 } } }).lean().limit(3);
    if (!availableDrivers) {
        throw new Error('Drivers Unaivailable for this route.');
    }

    // calculating distance between from and to "city"
    const peakPoints = [goingTo, departFrom]
        .map(call => geoUtil.getGeoLocation(call)
            .then(r => r.json())
            .then(res => ((res && res.results && res.results[0] && res.results[0].geometry && res.results[0].geometry.location) || null))
        );

    let finalDetailObject = await Promise.all(peakPoints);
    let distanceInKM = geoUtil.getDistance(...finalDetailObject) / 1000;
    distanceInKM = distanceInKM < 300 ? 300 : distanceInKM;

    if (journeyType === 'ONE_WAY') {

        //   if the distance is more that 50 km then change client to round trip
        if (distanceInKM > 300) {
            throw new Error('REDIRECT_TO_ROUND_TRIP');
        }

        const finalPrice = await FixedPrice.findOne({ fromCity: departFromCity, toCity: goingToCity }).lean();
        availableDrivers.map(driver => {
            driver['calculatedFare'] = (finalPrice && finalPrice.fixedPrice) || Math.floor(distanceInKM * 15 * 2);
            return driver;
        });
    }

    if (journeyType === 'ROUND_TRIP') {
        const departDateD = new Date(departDate);
        const returnDateD = new Date(returnDate);
        const days = calc.getDiff(departDateD, returnDateD) || 1;
        const additionalAmount = 250 * days;
        availableDrivers.map(driver => {
            driver['calculatedFare'] = Math.floor(driver.driverPricePerKM * distanceInKM) + additionalAmount;
            console.log('dd: ', driver['calculatedFare']);
            return driver;
        });
    }

    // TODO: not much time.
    if (journeyType === 'MULTI_CITY') {
    }
    return availableDrivers;
};

exports.getAllDrivers = async () => {
    const drivers = await Driver.find({});
    if(!drivers) {
        return [];
    }
    return drivers;
}