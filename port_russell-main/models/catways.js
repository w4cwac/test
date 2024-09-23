const mongoose = require('mongoose')

/**
 * Catway schema
 * @typedef {Object} Catway
 * @property {number} catwayNumber
 * @property {string} type
 * @property {string} catwayState
 * 
 */
const catwaysSchema = new mongoose.Schema({
    catwayNumber:{
        type: Number,
        required: true, 
        unique: true
    },
    type: {
        type: String,
        enum: ['long', 'court'],
        required: true
    },
    catwayState:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Catway', catwaysSchema)