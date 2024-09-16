import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import StallBookingForm from './StallBookingForm'; // Import the new component

const StallBookingPage = () => {
  const { state } = useLocation();
  const dataArray = state?.data || [];
  const [selectedImage, setSelectedImage] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedStallRent, setSelectedStallRent] = useState(0); // State to hold the rent per stall
  const [selectedEventName, setSelectedEventName] = useState(''); // State to hold the event name
  const [selectedOrganizerName, setSelectedOrganizerName] = useState(''); // State to hold the organizer's name
  const [selectedTotalStall, setSelectedTotalStall] = useState(0); // State to hold total stalls
  const [selectedAvailableStall, setSelectedAvailableStall] = useState(0); // State to hold available stalls
  const [selectedStallId, setSelectedStallId] = useState(null); // State to hold the selected stall ID

  // Debugging line to check the data
  console.log("Data received:", dataArray);

  const getBase64Image = (imageData) => {
    if (imageData) {
      return `data:image/jpeg;base64,${imageData}`;
    }
    return null;
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleViewMore = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const handleBookStall = (stallId, rent, eventName, organizerName, totalStall, availableStall) => {
    setSelectedStallId(stallId); // Set selected stall ID
    setSelectedStallRent(rent);
    setSelectedEventName(eventName); 
    setSelectedOrganizerName(organizerName);
    setSelectedTotalStall(totalStall);
    setSelectedAvailableStall(availableStall);
    setShowBookingForm(true); 
  };

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    return <div className="text-center text-red-600 text-3xl font-medium m-96"> No stalls available at this location</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Stall Booking Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dataArray.map((data, index) => {
            const {
              stallId,
              totalStall,
              availableStall,
              stallType,
              rent,
              stallModel,
              eventPoster,
              floorPlan,
              visitorCount,
              exhibition = {}
            } = data;

            const {
              eventName = 'N/A',
              organizerName = 'N/A',
              mobileNumber = 'N/A',
              eventVenue = 'N/A',
              venueType = 'N/A',
              eventType = 'N/A',
              startDate = new Date(),
              endDate = new Date()
            } = exhibition;

            const isExpanded = expandedIndex === index;

            return (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 max-w-md mx-auto transform transition-transform hover:scale-105 hover:shadow-xl"
              >
                <div className="relative">
                  {eventPoster && (
                    <img
                      src={getBase64Image(eventPoster)}
                      alt="Event Poster"
                      className="w-full h-48 object-cover cursor-pointer transition-transform duration-300 hover:scale-110"
                      onClick={() => handleImageClick(getBase64Image(eventPoster))}
                    />
                  )}
                  {floorPlan && (
                    <img
                      src={getBase64Image(floorPlan)}
                      alt="Floor Plan"
                      className="absolute bottom-0 right-0 w-24 h-24 object-cover border-4 border-red-800 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-110"
                      onClick={() => handleImageClick(getBase64Image(floorPlan))}
                    />
                  )}
                </div>

                <div className="p-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{eventName}</h2>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Organizer: {organizerName}</h3>
                  <p className="text-gray-600 mb-4">Contact Info: {mobileNumber}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-100 p-4 rounded-lg hover:bg-blue-200 transition duration-300">
                      <p><strong>Event Venue:</strong> <br />{eventVenue}</p>
                      <p><strong>Rent (Per Day):</strong> ₹{rent}</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg hover:bg-green-200 transition duration-300">
                      <p className="bg-yellow-200 p-2 rounded">Total Stalls: {totalStall}</p>
                      <p className="bg-orange-200 p-2 rounded">Available Stalls: {availableStall}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewMore(index)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300 mb-4 w-full"
                  >
                    {isExpanded ? 'Show Less' : 'View More'}
                  </button>

                  {isExpanded && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <p><strong>Event Type:</strong> <br/>{eventType}</p>
                        <p><strong>Venue Type:</strong> <br/> {venueType}</p>
                        <p><strong>Stall Type:</strong> <br/>{stallType}</p>
                        <p><strong>Stall Model:</strong> <br/>{stallModel}</p>
                      </div>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <p><strong>Start Date:</strong> <br/>{new Date(startDate).toLocaleDateString()}</p>
                        <p><strong>End Date:</strong> {new Date(endDate).toLocaleDateString()} 
                          <span className="bg-amber-400 text-white rounded-full px-2 py-1 ml-2"><b>{calculateDays(startDate, endDate)} Days</b></span>
                        </p>
                        <br/>
                        <p className='bg-green-400 p-3 rounded-2xl'><strong>Expected Visitor Count:</strong> {visitorCount}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 text-center">
                  <button
                    onClick={() => handleBookStall(stallId, rent, eventName, organizerName, totalStall, availableStall)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
                  >
                    Book Stall
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for Zoomed Image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg">
            <img src={selectedImage} alt="Zoomed" className="w-full max-w-4xl h-auto" />
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white bg-gray-800 hover:bg-gray-900 rounded-full p-2"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Modal for Booking Form */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <StallBookingForm
            onClose={() => setShowBookingForm(false)}
            stallId={selectedStallId} // Pass stallId here
            rentPerStall={selectedStallRent}
            eventName={selectedEventName}
            organizerName={selectedOrganizerName}
            totalStall={selectedTotalStall}
            availableStall={selectedAvailableStall}
          />
        </div>
      )}
    </div>
  );
};

export default StallBookingPage;

