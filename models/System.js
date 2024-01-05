const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
    distance: {
        type: Number,
        required: true
    },
    radius: {
        type: Number,
        required: true
    },
    dAlpha: {
        type: Number,
        required: true
    },
    phase: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    hasRings: {
        type: Boolean,
        required: true
    },
    satellites: [this]
});

const systemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name']
    }, 
    userId: {
        type: mongoose.ObjectId,
        ref: 'user',
        required: true
    },
    planets: [planetSchema]
});

const System = mongoose.model('system', systemSchema);

module.exports = System;