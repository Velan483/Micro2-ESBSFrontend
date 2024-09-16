// import React from 'react';

// const ReviewInformation = ({ formData }) => {
//   const {
//     mobile_number,
//     organizer_name,
//     event_name,
//     event_venue,
//     venue_type,
//     event_type,
//     start_date,
//     end_date,
//     stall_info,
//   } = formData;

//   const {
//     total_stall,
//     available_stall,
//     stall_Type,
//     rent,
//     stall_model,
//     event_poster,
//     floor_plan,
//     visitor_count,
//   } = stall_info;

//   const eventPosterUrl = event_poster ? URL.createObjectURL(event_poster) : '';
//   const floorPlanUrl = floor_plan ? URL.createObjectURL(floor_plan) : '';

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold text-center mb-6">Review Information</h1>
//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Left side: Images */}
//         <div className="flex flex-col gap-6 w-full md:w-1/2">
//           <div className="relative w-full h-48 border border-gray-300 rounded-lg overflow-hidden">
//             {event_poster ? (
//               <img
//                 src={eventPosterUrl}
//                 alt="Event Poster"
//                 className="object-cover w-full h-full"
//               />
//             ) : (
//               <div className="flex items-center justify-center w-full h-full text-gray-500">Event Poster</div>
//             )}
//           </div>
//           <div className="relative w-full h-48 border border-gray-300 rounded-lg overflow-hidden">
//             {floor_plan ? (
//               <img
//                 src={floorPlanUrl}
//                 alt="Floor Plan"
//                 className="object-cover w-full h-full"
//               />
//             ) : (
//               <div className="flex items-center justify-center w-full h-full text-gray-500">Floor Plan</div>
//             )}
//           </div>
//         </div>

//         {/* Right side: Text Information */}
//         <div className="w-full md:w-1/2">
//           <div className="mb-6">
//             <p className="text-md font-semibold"><strong>Organizer Name:</strong> {organizer_name}</p>
//             <p className="text-md font-semibold"><strong>Mobile Number:</strong> {mobile_number}</p>
//             <p className="text-md font-semibold"><strong>Event Name:</strong> {event_name}</p>
//             <p className="text-md font-semibold"><strong>Event Venue:</strong> {event_venue}</p>
//             <p className="text-md font-semibold"><strong>Venue Type:</strong> {venue_type}</p>
//             <p className="text-md font-semibold"><strong>Event Type:</strong> {event_type}</p>
//             <p className="text-md font-semibold"><strong>Start Date:</strong> {new Date(start_date).toLocaleDateString()}</p>
//             <p className="text-md font-semibold"><strong>End Date:</strong> {new Date(end_date).toLocaleDateString()}</p>
//           </div>
//           <div>
//             <p className="text-md font-semibold"><strong>Total Stalls:</strong> {total_stall}</p>
//             <p className="text-md font-semibold"><strong>Available Stalls:</strong> {available_stall}</p>
//             <p className="text-md font-semibold"><strong>Stall Type:</strong> {stall_Type}</p>
//             <p className="text-md font-semibold"><strong>Rent Per Day:</strong> {rent}</p>
//             <p className="text-md font-semibold"><strong>Stall Model:</strong> {stall_model}</p>
//             <p className="text-md font-semibold"><strong>Visitor Count:</strong> {visitor_count}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewInformation;


import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaPhoneAlt, FaBuilding, FaTag, FaDollarSign, FaChartLine, FaImage } from 'react-icons/fa';
import { MdEventAvailable } from 'react-icons/md';

const ReviewInformation = ({ formData }) => {
  const {
    mobile_number,
    organizer_name,
    event_name,
    event_venue,
    venue_type,
    event_type,
    start_date,
    end_date,
    stall_info,
  } = formData;

  const {
    total_stall,
    available_stall,
    stall_Type,
    rent,
    stall_model,
    event_poster,
    floor_plan,
    visitor_count,
  } = stall_info;

  const eventPosterUrl = event_poster ? URL.createObjectURL(event_poster) : '';
  const floorPlanUrl = floor_plan ? URL.createObjectURL(floor_plan) : '';

  return (
    <div className="p-8 max-w-7xl mx-auto ">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Review Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side: Images */}
        <div className="space-y-6"> 
         <p className="text-center text-lg font-semibold bg-red-200 p-1">Event Poster and Floor Plan</p>
          <div className="relative w-full h-44 border border-gray-300 rounded-lg overflow-hidden"> 
            {event_poster ? (
              <img
                src={eventPosterUrl}
                alt="Event Poster"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-500 bg-gray-100">
                <FaImage className="text-5xl" />
                <p className="ml-3 text-lg">Event Poster</p>
              </div>
            )}
          </div>
          <div className="relative w-full h-44 border border-gray-300 rounded-lg overflow-hidden">
            {floor_plan ? (
              <img
                src={floorPlanUrl}
                alt="Floor Plan"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-500 bg-gray-100">
                <FaImage className="text-5xl" />
                <p className="ml-3 text-lg">Floor Plan</p>
              </div>
            )}
          </div>
        </div>

        {/* Right side: Text Information */}
        <div className="space-y-6">
          <div className="text-gray-700">
            <div className="flex items-center space-x-3">
              <FaUser className="text-xl text-gray-600" />
              <p className="text-lg font-semibold"><strong>Organizer Name:</strong> {organizer_name}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="text-xl text-gray-600" />
              <p className="text-lg font-semibold"><strong>Mobile Number:</strong> {mobile_number}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-xl text-gray-600" />
              <p className="text-lg font-semibold"><strong>Event Name:</strong> {event_name}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaBuilding className="text-xl text-gray-600" />
              <p className="text-lg font-semibold"><strong>Event Venue:</strong> {event_venue}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaBuilding className="text-xl text-gray-600" />
              <p className="text-lg font-semibold"><strong>Venue Type:</strong> {venue_type}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaTag className="text-xl text-gray-600" />
              <p className="text-lg font-semibold"><strong>Event Type:</strong> {event_type}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaCalendarAlt className="text-xl text-gray-600" />
              <p className="text-lg font-semibold"><strong>Start Date:</strong> {new Date(start_date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaCalendarAlt className="text-xl text-gray-600" />
              <p className="text-lg font-semibold"><strong>End Date:</strong> {new Date(end_date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="text-gray-700">
            <div className="flex items-center space-x-3">
              <MdEventAvailable className="text-xl text-gray-600" />
              <p className="text-lg font-semibold"><strong>Total Stalls:</strong> {total_stall}</p>
            </div>
            <div className="flex items-center space-x-3">
              <MdEventAvailable className="text-xl text-gray-600" />
              <p className="text-lg font-semibold"><strong>Available Stalls:</strong> {available_stall}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaTag className="text-xl text-gray-600" />
              <p className="text-lg font-semibold"><strong>Stall Type:</strong> {stall_Type}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaDollarSign className="text-xl text-gray-600" />
              <p className="text-lg font-semibold"><strong>Rent Per Day:</strong> {rent}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaBuilding className="text-xl text-gray-600" />
              <p className="text-lg font-semibold"><strong>Stall Model:</strong> {stall_model}</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaChartLine className="text-xl text-gray-600" />
              <p className="text-lg font-semibold"><strong>Visitor Count:</strong> {visitor_count}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewInformation;

