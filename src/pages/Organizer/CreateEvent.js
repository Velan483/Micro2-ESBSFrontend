import React from "react";

const districts = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Trichy",
  "Salem",
  "Tirunelveli",
  "Vellore",
  "Erode",
  "Tiruppur",
  "Kanchipuram",
  "Thoothukudi",
  "Dharmapuri",
  "Viluppuram",
  "Nagapattinam",
  "Karur",
  "Ramanathapuram",
  "Thanjavur",
  "Pudukkottai",
  "Nagercoil",
  "Dindigul",
];

const CreateEvent = ({ formData, handleFormDataChange, errors, minDate }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleFormDataChange({ [name]: value });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create Event</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mobile Number */}
        <div>
          <label htmlFor="mobile_number" className="block text-gray-700 font-semibold mb-2">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile_number"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.mobile_number && <p className="text-red-600">{errors.mobile_number}</p>}
        </div>
        {/* Organizer Name */}
        <div>
          <label htmlFor="organizer_name" className="block text-gray-700 font-semibold mb-2">
            Organizer Name
          </label>
          <input
            type="text"
            id="organizer_name"
            name="organizer_name"
            value={formData.organizer_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.organizer_name && <p className="text-red-600">{errors.organizer_name}</p>}
        </div>
        {/* Event Name */}
        <div>
          <label htmlFor="event_name" className="block text-gray-700 font-semibold mb-2">
            Event Name
          </label>
          <input
            type="text"
            id="event_name"
            name="event_name"
            value={formData.event_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.event_name && <p className="text-red-600">{errors.event_name}</p>}
        </div>
        {/* Event Venue */}
        <div>
          <label htmlFor="event_venue" className="block text-gray-700 font-semibold mb-2">
            Event Venue
          </label>
          <select
            id="event_venue"
            name="event_venue"
            value={formData.event_venue}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Venue</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.event_venue && <p className="text-red-600">{errors.event_venue}</p>}
        </div>
        {/* Venue Type */}
        <div>
          <label htmlFor="venue_type" className="block text-gray-700 font-semibold mb-2">
            Select Venue Type
          </label>
          <select
            id="venue_type"
            name="venue_type"
            value={formData.venue_type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Venue Type</option>
            <option value="Apartments">Apartments</option>
            <option value="Open Ground">Open Ground</option>
            <option value="Tech Parks">Tech Parks</option>
            <option value="Street Fair">Street Fair</option>
            <option value="Hotels">Hotels</option>
            <option value="Banquet Halls">Banquet Halls</option>
            <option value="Malls and Complexes">Malls and Complexes</option>
            <option value="Convention Centres">Convention Centres</option>
            <option value="Premium Venues">Premium Venues</option>
            <option value="Social Clubs">Social Clubs</option>
            <option value="College & Universities">College & Universities</option>
          </select>
          {errors.venue_type && <p className="text-red-600">{errors.venue_type}</p>}
        </div>
        {/* Event Type */}
        <div>
          <label htmlFor="event_type" className="block text-gray-700 font-semibold mb-2">
            Select Event Type
          </label>
          <select
            id="event_type"
            name="event_type"
            value={formData.event_type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Event Type</option>
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Both">Both</option>
          </select>
          {errors.event_type && <p className="text-red-600">{errors.event_type}</p>}
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="start_date" className="block text-gray-700 font-semibold mb-2">
            Start Date
          </label>
          <input
            type="datetime-local"
            id="start_date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min={minDate}
          />
          {errors.start_date && <p className="text-red-600">{errors.start_date}</p>}
        </div>
        {/* End Date */}
        <div>
          <label htmlFor="end_date" className="block text-gray-700 font-semibold mb-2">
            End Date
          </label>
          <input
            type="datetime-local"
            id="end_date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min={formData.start_date ? new Date(new Date(formData.start_date).getTime() + 60*60*1000).toISOString().slice(0, 16) : minDate}
          />
          {errors.end_date && <p className="text-red-600">{errors.end_date}</p>}
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
