const mongoose = require('mongoose');

const reservationsSchema = mongoose.Schema({
    trip_id : { type: mongoose.Schema.Types.ObjectId, ref: 'trips' },
    isBooked : Boolean,
    isPurchased : Boolean,
});

const Reservation = mongoose.model('reservations',reservationsSchema);

module.exports = Reservation;