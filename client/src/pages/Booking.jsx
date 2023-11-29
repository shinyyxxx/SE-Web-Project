import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../context/userContext';
import './Booking.css'

const BookingPage = () => {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    name: '',
    room: '',
    note: '',
    date: '',
  });

  useEffect(() => {
    // Fetch bookings from the backend
    axios
      .get('http://localhost:8000/api/bookings')
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => console.error('Error fetching bookings:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Submit the new booking to the backend
      const response = await axios.post('http://localhost:8000/api/bookings/', {
        ...newBooking,
        username: user ? user.username : 'Guest',
      });

      const createdBooking = response.data;

      // Update the bookings state with the new booking
      setBookings((prevBookings) => [...prevBookings, createdBooking]);

      // Clear the form after successful submission
      setNewBooking({
        name: '',
        room: '',
        note: '',
        date: '',
      });

      console.log('Booking created successfully:', createdBooking);
      toast.success('Booking Created Successfully!');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Display specific error messages for bad requests
        toast.error(error.response.data.error);
      } else {
        console.error('Error creating booking:', error);
        toast.error('An error occurred while creating the booking.');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      // Send a request to delete the booking
      const response = await axios.delete(`http://localhost:8000/api/bookings/${id}`, {
        data: {
          username: user ? user.username : 'Guest',
        },
      });

      // If the delete request is successful, update the bookings state
      if (response.status === 204) {
        setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
        toast.success('Booking Deleted Successfully!');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error('An error occurred while deleting the booking.');
    }
  };

  return (
    <div className="booking-page">
      <header className="page-heading">
        <div className="searchbar-group">
          <div className="uni-logo">
            <img className="image-1-icon2" alt="" src="/image-11@2x.png" />
            <div className="se-kmitl1">SE KMITL</div>
          </div>
        </div>
      </header>
    <div className='background-container-book'>
      <div className='topPart'>
      <h2>Booking Page</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={newBooking.name} onChange={handleInputChange} required />

        <label htmlFor="room">Resources:</label>
        <input type="text" id="room" name="room" value={newBooking.room} onChange={handleInputChange} required />

        <label htmlFor="note">Note:</label>
        <textarea id="note" name="note" value={newBooking.note} onChange={handleInputChange}></textarea>

        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" value={newBooking.date} onChange={handleInputChange} required />

        <button type="submit">Reserve</button>
      </form>
    </div>
      <h3>Bookings</h3>
      <div className="table-container">
      <table id='keywords' className='keywords'>
    <thead>
      <tr>
        <th>Name</th>
        <th>Resource</th>
        <th>Date</th>
        <th>Booked By</th>
        {user && user.email === "test@test.test" && <th>Action</th>}
      </tr>
    </thead>
    <tbody>
      {bookings.map((booking) => (
        <tr key={booking._id}>
          <td>{booking.name}</td>
          <td>{booking.room}</td>
          <td>{booking.date ? new Date(booking.date).toLocaleDateString() : 'Invalid Date'}</td>
          <td>{booking.username}</td>
          {user && user.email === "test@test.test" && (
            <td>
              <button onClick={() => handleDelete(booking._id)}>Delete</button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
    </table>
    </div>
    </div>
    </div>
  );
};

export default BookingPage;
