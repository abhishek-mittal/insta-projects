const fetch = require('node-fetch');
fetch.Promise = Promise;


function getPresentCity(value = '') {
    if (!value) {
        return value;
    }
    value = value.toLowerCase();
    const keys = value.trim().split(', ').reverse().splice(0, 3) || [];
    console.log(keys[keys.length - 1]);
    return keys[keys.length - 1];

}

function rad (x) {
    return x * Math.PI / 180;
};

// thanks to: https://stackoverflow.com/a/1502821/10791417
function getDistance (p1, p2) {
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

function getGeoLocation (address) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address || ''}&v=3&key=${process.env.GMAP_API_KEY}&libraries=geometry`)
}

function getGeoAddress (address) {
    return fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address || ''}&region=in&v=3&key=${process.env.GMAP_API_KEY}&libraries=geometry`).then(r => r.json());
}

module.exports = {
    getPresentCity, getDistance, getGeoLocation, getGeoAddress
}