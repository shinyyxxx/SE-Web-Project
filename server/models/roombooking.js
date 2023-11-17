const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  date: { 
    type: Date,
  },
  username: {
    type: String,
  },
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
