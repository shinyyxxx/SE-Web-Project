const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();


//database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database Connected'))
  .catch((err) => console.error('Database Connection Error:', err));

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/authRoutes'))
app.use('/api/community', require('./routes/communityRoutes'));
app.use('/api/learning-resources', require('./routes/learningResourcesRoutes'));
app.use('/api/enrollment', require('./routes/enrollmentRoutes'));
app.use('/api/bookings/', require('./routes/bookingRoutes'))


const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))