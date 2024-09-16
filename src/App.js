import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import AboutUs from './pages/About';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ProtectedRoute from './features/ProtectedRoute';
import { AuthProvider } from './features/AuthContext'; 
import NotFoundPage from './features/NotFound';
import Footer from './components/Footor';
import Dashboard from './pages/Organizer/Dashboard';
import StallBookingPage from './pages/Exhibitor/StallBookingPage';
import BookingDetails from './pages/Exhibitor/BookingDetails';
import PaymentPage from './pages/Exhibitor/PaymentPage';
import OTPPage from './pages/Exhibitor/OTPPage';
import PINNumberPage from './pages/Exhibitor/PINNumberPage';
import ConfirmationPage from './pages/Exhibitor/ConfirmationPage';
import BookingHistoryPage from './pages/Exhibitor/BookingHistoryPage';
import AllExhibitionRecords from './pages/Exhibitor/AllExhibitionRecords';
import DistrictSelector from './pages/Exhibitor/Cities';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/stall-booking/:district" element={<StallBookingPage/>} />
            <Route path="/booking-details" element={<BookingDetails/>} />
            <Route path="/payment" element={<PaymentPage/>} />
            <Route path="/otp" element={<OTPPage />} />
            <Route path="/pin" element={<PINNumberPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/booking-history" element={<BookingHistoryPage />} />
            <Route path="/all-exhibition" element={<AllExhibitionRecords />} />
            <Route path="/cities" element={<DistrictSelector />} />


            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
            {/* Catch-all route for handling 404 - Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer/>
      </Router>
    </AuthProvider>
  );
}

export default App;
