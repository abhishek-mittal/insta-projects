const locationH = require('./../handlers/location');

const getLocationAutofill = async (req, res, next) => {

    try {
        const { address } = req.query;
        const addresses = await locationH.getLocationPredictions(address);
        res.json({ success: true, data: addresses });
    } catch (error) {
        res.json({ success: false, data: [], error: error });
    }

};

module.exports = {
    getLocationAutofill
}