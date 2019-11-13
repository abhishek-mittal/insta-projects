const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            trim: true,
            default: ''
        },
        email: {
            type: String,
            trim: true,
            required: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            // minlength: 8
        },
        phone: {
            type: String,
            trim: true,
            default: ''
        },
        journeys: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'JourneyPlan'
            }
        ]
    },
    {
        timestamps: true,
        autoIndex: true
    }
);

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;
