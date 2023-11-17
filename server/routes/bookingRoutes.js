// routes/bookingRoutes.js

const express = require('express');
const router = express.Router();
const cors = require('cors');
const { createbook, getBook, deleteBook } = require('../controllers/bookingController');


router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);


router.post('/', createbook);
router.get('/', getBook);
router.delete('/:id', deleteBook);

module.exports = router;