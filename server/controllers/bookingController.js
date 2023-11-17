const Booking = require('../models/roombooking');

const createbook = async (req, res) => {
  try {
    const { name, room, note, date, username } = req.body;

    // Check if the room is already reserved for the given date
    const dateExist = await Booking.findOne({ room, date });
    if (dateExist) {
      return res.status(400).json({
        error: "Room is already reserved for the given date",
      });
    }

    // Check if the date is in the past
    if (new Date(date) < new Date()) {
      return res.status(400).json({
        error: "Cannot book a room for a past date",
      });
    }

    const newBook = await Booking.create({
      name,
      room,
      note,
      date,
      username,
    });

    return res.status(201).json(newBook);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getBook = async (req, res) => {
  try {
    const book = await Booking.find({});
    res.status(200).json(book);
  } catch (error) {
    console.error('Error getting book:', error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    // Find the booking by id and username
    const booking = await Booking.findOne({ _id: id, username });

    if (!booking) {
      return res.status(404).json({
        error: 'Booking not found or unauthorized to delete',
      });
    }

    // Delete the booking
    await Booking.findByIdAndDelete(id);

    return res.status(204).send(); // 204 No Content - Successful deletion
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createbook, getBook, deleteBook };