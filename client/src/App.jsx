import './App.css'
import {Routes, Route} from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import axios from 'axios';
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext';
import ProfilePage from './pages/ProfilePage';
import MainPage from './pages/MainPage';
import LearingResorces from './pages/LearningResources';
import Community from './pages/Community'; // Update the import statement
import EnrollmentPage from './pages/EnrollmentPage'; // Update the import statement
import BookingPage from './pages/Booking';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{duration: 2000}} />

      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/register' element = {<Register />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/pfp' element = {<ProfilePage />} />
        <Route path='/main-page' element = {<MainPage />} />
        <Route path='/community' element = {<Community />} />
        <Route path='/learning-resources' element = {<LearingResorces />} />
        <Route path='/enrollment' element = {<EnrollmentPage />} />
        <Route path='/booking' element = {<BookingPage />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
