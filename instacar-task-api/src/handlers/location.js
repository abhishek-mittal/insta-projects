const { geoUtil } = require('./utils');

exports.getLocationPredictions = async (addressString) => {
    // set the final result
    const addresses = await geoUtil.getGeoAddress(addressString);
  
    if (!addresses && !addresses.lengths) {
      throw new Error('LOCATION_NOT_FOUND');
    }
    return addresses.predictions;
};