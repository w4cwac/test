const mongoose = require('mongoose');

/**
 * Reservation schema
 * @typedef {Object} Reservation
 * @property {number} catwayNumber
 * @property {string} clientName
 * @property {string} boatName
 * @property {date} checkIn
 * @property {date} checkOut
 * 
 */
const reservationSchema = new mongoose.Schema({
    catwayNumber:{
        type: Number,
        required: true,
    },
    clientName:{
        type: String,
        required: true
    },
    boatName:{
        type: String,
        required: true
    },
    checkIn:{
        type: Date,
        required: true
    },
    checkOut:{
        type: Date,
        required: true
    }

});

module.exports = mongoose.model('Reservation', reservationSchema)