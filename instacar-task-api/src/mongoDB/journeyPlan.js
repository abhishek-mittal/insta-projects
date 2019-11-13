const mongoose = require('mongoose');

const journeyPlanSchema = new mongoose.Schema(
    {
        goingTo: {
            type: mongoose.Schema.Types.String,
            trim: true,
            required: true
        },
        departFrom: {
            type: mongoose.Schema.Types.String,
            trim: true,
            required: true
        },
        departDate: {
            type: mongoose.Schema.Types.Date,
            required: true
        },
        returnDate: {
            type: mongoose.Schema.Types.Date
        },
        journeyType: {
            type: mongoose.Schema.Types.String,
            enum: 'ONE_WAY' | 'ROUND_TRIP' | 'MULTI_CITY',
            trim: true,
            default: ''
        },
        transaction: {
            customer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            assignedDriver: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Driver'
            },
            payment: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Payment'
            }
        }
    },
    {
        timestamps: true,
        autoIndex: true
    }
);


const JourneyPlan = mongoose.model('JourneyPlan', journeyPlanSchema, 'journeyPlan');
module.exports = JourneyPlan;