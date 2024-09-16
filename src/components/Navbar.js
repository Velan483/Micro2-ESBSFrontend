import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaInfoCircle,
  FaConciergeBell,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCircle
} from 'react-icons/fa';
import logo from '../assets/logo.png';
import Modal from '../features/Modal';
import LoginPage from '../pages/LoginPage';
import ProfileModal from '../features/ProfileModal';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState({
    email: '',
    role: '',
    profilePhotoUrl: sessionStorage.getItem('ProfilePhotoUrl') || ''
  });
  const [redirectTo, setRedirectTo] = useState(null);

  const navigate = useNavigate();

  // Function to open the modal with the specified content
  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    // Fetch user info from session storage
    const email = sessionStorage.getItem('Email');
    const role = sessionStorage.getItem('Role');
    const profilePhotoUrl = sessionStorage.getItem('ProfilePhotoUrl') || '';
    setUser({ email, role, profilePhotoUrl });
    if (redirectTo) {
      navigate(redirectTo);
      setRedirectTo(null); // Clear redirectTo after navigation
    }
    closeModal();
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.clear();
    setUser({ email: '', role: '', profilePhotoUrl: '' });
    navigate("/");
  };

  // Function to handle the create event button click
  const handleCreateEventClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      setRedirectTo('/dashboard'); // Store intended destination
      openModal(<LoginPage onLogin={handleLogin} onClose={closeModal} />);
    }
  };

  // Function to toggle profile dropdown
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  // Update user profile photo URL
  const handlePhotoUpdate = (newPhotoUrl) => {
    setUser((prevUser) => ({ ...prevUser, profilePhotoUrl: newPhotoUrl }));
  };

  return (
    <nav className="bg-teal-800 text-white p-4 sticky top-0 w-full shadow-md z-50">
      <div className="container-fluid mx-auto flex items-center justify-between">
        {/* Logo and Website Name */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
          <span className="text-xl font-bold font-merienda">
            <span className="text-white-600">My Stall</span>
            <span className="text-orange-500"> Booking</span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center hover:text-gray-300">
            <FaHome className="mr-1" /> Home
          </Link>
          <Link to="/about" className="flex items-center hover:text-gray-300">
            <FaInfoCircle className="mr-1" /> About Us
          </Link>
          <Link to="/services" className="flex items-center hover:text-gray-300">
            <FaConciergeBell className="mr-1" /> Services
          </Link>

          {/* Conditional Login/Logout Button and Avatar */}
          {!isLoggedIn ? (
            <button
              className="flex items-center text-white hover:text-gray-300 focus:outline-none"
              onClick={() => openModal(<LoginPage onLogin={handleLogin} onClose={closeModal} />)}
            >
              <FaSignInAlt className="mr-1" /> Login
            </button>
          ) : (
            <div className="relative">
              <button
                className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                onClick={toggleProfileDropdown}
              >
                {user.profilePhotoUrl ? (
                  <img
                    src={user.profilePhotoUrl}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-2xl" />
                )}
              </button>
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg">
                  <button
                    className="w-full px-4 py-2 text-left hover:bg-gray-200 flex items-center"
                    onClick={() => openModal(<ProfileModal user={user} onClose={closeModal} onPhotoUpdate={handlePhotoUpdate} />)}
                  >
                    <FaUserCircle className="mr-2" /> View Profile
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left hover:bg-gray-200 flex items-center"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Create Event Button */}
          <button
            className="bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 flex items-center"
            onClick={handleCreateEventClick}
          >
            + Create Event
          </button>
        </div>
      </div>

      {/* Modal for Login and Profile */}
      <Modal isOpen={showModal} onClose={closeModal}>
        {modalContent}
      </Modal>
    </nav>
  );
};

export default Navbar;


// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   FaHome,
//   FaInfoCircle,
//   FaConciergeBell,
//   FaSignInAlt,
//   FaSignOutAlt,
//   FaUserCircle
// } from 'react-icons/fa';
// import logo from '../assets/logo.png';
// import Modal from '../features/Modal';
// import LoginPage from '../pages/LoginPage';
// import ProfileModal from '../features/ProfileModal';

// const Navbar = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const [user, setUser] = useState({
//     email: '',
//     role: '',
//     profilePhotoUrl: ''
//   });
//   const [redirectTo, setRedirectTo] = useState(null);

//   const navigate = useNavigate();

//   // Function to open the modal with the specified content
//   const openModal = (content) => {
//     setModalContent(content);
//     setShowModal(true);
//   };

//   // Function to close the modal
//   const closeModal = () => {
//     setShowModal(false);
//   };

//   // Function to handle login
//   const handleLogin = () => {
//     setIsLoggedIn(true);
//     // Fetch user info from session storage
//     const email = sessionStorage.getItem('Email');
//     const role = sessionStorage.getItem('Role');
//     const profilePhotoUrl = sessionStorage.getItem('ProfilePhotoUrl') || '';
//     setUser({ email, role, profilePhotoUrl });
//     if (redirectTo) {
//       navigate(redirectTo);
//       setRedirectTo(null); // Clear redirectTo after navigation
//     }
//     closeModal();
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     sessionStorage.clear();
//     setUser({ email: '', role: '', profilePhotoUrl: '' });
//     navigate("/");
//   };

//   // Function to handle the create event button click
//   const handleCreateEventClick = () => {
//     if (isLoggedIn) {
//       navigate('/dashboard');
//     } else {
//       setRedirectTo('/dashboard'); // Store intended destination
//       openModal(<LoginPage onLogin={handleLogin} onClose={closeModal} />);
//     }
//   };

//   // Function to toggle profile dropdown
//   const toggleProfileDropdown = () => {
//     setShowProfileDropdown(!showProfileDropdown);
//   };

//   // Update user profile photo URL
//   const handlePhotoUpdate = (newPhotoUrl) => {
//     setUser((prevUser) => ({ ...prevUser, profilePhotoUrl: newPhotoUrl }));
//   };

//   // Retrieve user data from sessionStorage on component mount
//   useEffect(() => {
//     const email = sessionStorage.getItem('Email');
//     const role = sessionStorage.getItem('Role');
//     const profilePhotoUrl = sessionStorage.getItem('ProfilePhotoUrl') || '';
//     if (email && role) {
//       setIsLoggedIn(true);
//       setUser({ email, role, profilePhotoUrl });
//     }
//   }, []);

//   return (
//     <nav className="bg-teal-800 text-white p-4 sticky top-0 w-full shadow-md z-50">
//       <div className="container-fluid mx-auto flex items-center justify-between">
//         {/* Logo and Website Name */}
//         <div className="flex items-center space-x-4">
//           <img src={logo} alt="Logo" className="h-12 w-auto" />
//           <span className="text-xl font-bold font-merienda">
//             <span className="text-white-600">My Stall</span>
//             <span className="text-orange-500"> Booking</span>
//           </span>
//         </div>

//         {/* Navigation Links */}
//         <div className="flex items-center space-x-6">
//           <Link to="/" className="flex items-center hover:text-gray-300">
//             <FaHome className="mr-1" /> Home
//           </Link>
//           <Link to="/about" className="flex items-center hover:text-gray-300">
//             <FaInfoCircle className="mr-1" /> About Us
//           </Link>
//           <Link to="/services" className="flex items-center hover:text-gray-300">
//             <FaConciergeBell className="mr-1" /> Services
//           </Link>

//           {/* Conditional Login/Logout Button and Avatar */}
//           {!isLoggedIn ? (
//             <button
//               className="flex items-center text-white hover:text-gray-300 focus:outline-none"
//               onClick={() => openModal(<LoginPage onLogin={handleLogin} onClose={closeModal} />)}
//             >
//               <FaSignInAlt className="mr-1" /> Login
//             </button>
//           ) : (
//             <div className="relative">
//               <button
//                 className="flex items-center text-white hover:text-gray-300 focus:outline-none"
//                 onClick={toggleProfileDropdown}
//               >
//                 {user.profilePhotoUrl ? (
//                   <img
//                     src={user.profilePhotoUrl}
//                     alt="Profile"
//                     className="w-8 h-8 rounded-full object-cover"
//                   />
//                 ) : (
//                   <FaUserCircle className="text-2xl" />
//                 )}
//               </button>
//               {showProfileDropdown && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg">
//                   <button
//                     className="w-full px-4 py-2 text-left hover:bg-gray-200 flex items-center"
//                     onClick={() => openModal(<ProfileModal user={user} onClose={closeModal} onPhotoUpdate={handlePhotoUpdate} />)}
//                   >
//                     <FaUserCircle className="mr-2" /> View Profile
//                   </button>
//                   <button
//                     className="w-full px-4 py-2 text-left hover:bg-gray-200 flex items-center"
//                     onClick={handleLogout}
//                   >
//                     <FaSignOutAlt className="mr-2" /> Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Create Event Button */}
//           <button
//             className="bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 flex items-center"
//             onClick={handleCreateEventClick}
//           >
//             + Create Event
//           </button>
//         </div>
//       </div>

//       {/* Modal for Login and Profile */}
//       <Modal isOpen={showModal} onClose={closeModal}>
//         {modalContent}
//       </Modal>
//     </nav>
//   );
// };

// export default Navbar;







