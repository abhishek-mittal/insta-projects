const driverHandler = require('./../handlers/drivers');

const getAvailaibleDrivers = async (req, res, next) => {
    try {
        const availableDrivers = await driverHandler.getAvailaibleDrivers(req.body);
        res.json({ success: true, data: availableDrivers });
    } catch (error) {
        res.json({
            status: false,
            data: [],
            error: {
                message: error.message
            }
        });
    }
};

const getAllDrivers = async (req, res, next) => {
    try {
        const drivers = await driverHandler.getAllDrivers();
        res.json({ success: true, drivers });
    } catch (error) {
        res.json({
            status: false,
            data: error
        });
    }
}

module.exports = {
    getAvailaibleDrivers, getAllDrivers
}