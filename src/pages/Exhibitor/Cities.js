// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Example of districts data
// const districts = [
//   "Chennai", "Coimbatore", "Madurai", "Trichy", "Salem",
//   "Tirunelveli", "Vellore", "Erode", "Tiruppur", "Kanchipuram",
//   "Thoothukudi", "Dharmapuri", "Viluppuram", "Nagapattinam", "Karur",
//   "Ramanathapuram", "Thanjavur", "Pudukkottai", "Nagercoil", "Dindigul"
// ];

// const DistrictSelector = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Mock function to check if the user is logged in
//   const isLoggedIn = () => {
//     // Replace this with your actual authentication check
//     return sessionStorage.getItem('name') !== null;
//   };

//   const filteredDistricts = districts.filter(district =>
//     district.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSelect = async (district) => {
//     if (!isLoggedIn()) {
//       toast.error("Please login to continue");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(`http://localhost:8090/stall/eventVenue/${district}`);
//       if (response.data) {
//         navigate(`/stall-booking/${district}`, { state: { data: response.data } });
//       } else {
//         setError("No data available for the selected district.");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError("Failed to fetch data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 mx-auto">
//       <div className="text-center mb-6">
//         <label htmlFor="search" className="block text-2xl font-bold text-gray-800 mb-2">
//           Enter Stall Location
//         </label>
//         <input
//           id="search"
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search for a district..."
//           className="border border-gray-300 rounded-full p-3 mb-6 w-full max-w-sm mx-auto text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
//         />
//       </div>

//       {loading && <div className="text-center text-blue-600">Loading...</div>}
//       {error && <div className="text-center text-red-600">{error}</div>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {filteredDistricts.length > 0 ? (
//           filteredDistricts.map((district) => (
//             <div
//               key={district}
//               className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 border border-gray-200 rounded-lg shadow-xl p-6 flex flex-col items-center text-center w-full max-w-5xl transform transition-transform hover:scale-105 hover:shadow-2xl"
//             >
//               <h3 className="text-2xl font-semibold text-white mb-3">{district}</h3>
//               <p className="text-gray-100 text-base mb-4">Book a stall in {district}</p>
//               <p className="text-gray-100 text-base mb-4">Available Events</p>
//               <button
//                 className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
//                 onClick={() => handleSelect(district)}
//               >
//                 Select
//               </button>
//             </div>
//           ))
//         ) : (
//           <div className="flex items-center justify-center w-full h-64">
//             <h3 className="text-red-500 text-2xl font-bold">No districts found</h3>
//           </div>
//         )}
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default DistrictSelector;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Example of districts data
const districts = [
  "Chennai", "Coimbatore", "Madurai", "Trichy", "Salem",
  "Tirunelveli", "Vellore", "Erode", "Tiruppur", "Kanchipuram",
  "Thoothukudi", "Dharmapuri", "Viluppuram", "Nagapattinam", "Karur",
  "Ramanathapuram", "Thanjavur", "Pudukkottai", "Nagercoil", "Dindigul"
];

const DistrictSelector = ({ venueCounts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Mock function to check if the user is logged in
  const isLoggedIn = () => {
    // Replace this with your actual authentication check
    return sessionStorage.getItem('name') !== null;
  };

  const filteredDistricts = districts.filter(district =>
    district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = async (district) => {
    if (!isLoggedIn()) {
      toast.error("Please login to continue");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:8090/stall/eventVenue/${district}`);
      if (response.data) {
        navigate(`/stall-booking/${district}`, { state: { data: response.data } });
      } else {
        setError("No data available for the selected district.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mx-auto">
      <div className="text-center mb-6">
        <label htmlFor="search" className="block text-2xl font-bold text-gray-800 mb-2">
          Enter Stall Location
        </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a district..."
          className="border border-gray-300 rounded-full p-3 mb-6 w-full max-w-sm mx-auto text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        />
      </div>

      {loading && <div className="text-center text-blue-600">Loading...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredDistricts.length > 0 ? (
          filteredDistricts.map((district) => {
            const count = venueCounts[district] || 0;
            return (
              <div
                key={district}
                className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 border border-gray-200 rounded-lg shadow-xl p-6 flex flex-col items-center text-center w-full max-w-5xl transform transition-transform hover:scale-105 hover:shadow-2xl"
              >
                <h3 className="text-2xl font-semibold text-white mb-3">{district}</h3>
                <p className="text-gray-100 text-base mb-4">Book a stall in {district}</p>
                <p className="text-gray-100 text-base mb-4 bg-orange-500 font-bold p-2 rounded-full">Available Events - {count}</p>
                <button
                  className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
                  onClick={() => handleSelect(district)}
                >
                  Select
                </button>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center w-full h-64">
            <h3 className="text-red-500 text-2xl font-bold">No districts found</h3>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default DistrictSelector;






