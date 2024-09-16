import React, { useState } from 'react';
import CreateEvent from './CreateEvent';
import StallInformation from './StallInformation';
import ReviewInformation from './ReviewInformation';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    mobile_number: '',
    organizer_name: '',
    event_name: '',
    event_venue: '',
    venue_type: '',
    event_type: '',
    start_date: '',
    end_date: '',
    stall_info: {
      total_stall: '',
      available_stall: '',
      stall_Type: '',
      rent:'',
      stall_model: '',
      event_poster: null,
      floor_plan: null,
      visitor_count: ''
    }
  });
  const [errors, setErrors] = useState({}); // To store error messages

  const handleFormDataChange = (updatedData) => {
    setFormData(prevData => ({
      ...prevData,
      ...updatedData
    }));
  };

  const validateStep1 = () => {
    const errors = {};
    if (!formData.mobile_number) errors.mobile_number = 'Mobile number is required.';
    else if (formData.mobile_number.length !== 10) errors.mobile_number = 'Mobile number must be exactly 10 digits.';

    if (!formData.start_date) errors.start_date = 'Start date is required.';
    if (!formData.end_date) errors.end_date = 'End date is required.';
    else if (new Date(formData.end_date) <= new Date(formData.start_date)) errors.end_date = 'End date must be after start date.';

    if (!formData.organizer_name) errors.organizer_name = 'Organizer name is required.';
    if (!formData.event_name) errors.event_name = 'Event name is required.';
    if (!formData.event_venue) errors.event_venue = 'Event venue is required.';
    if (!formData.venue_type) errors.venue_type = 'Venue type is required.';
    if (!formData.event_type) errors.event_type = 'Event type is required.';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};
    const stallInfo = formData.stall_info;
    if (!stallInfo.total_stall) errors.total_stall = 'Total stall is required.';
    if (!stallInfo.available_stall) errors.available_stall = 'Available stall is required.';
    if (!stallInfo.stall_Type) errors.stall_Type = 'Stall type is required.';
    if (!stallInfo.rent) errors.rent = 'rent is required.';
    if (!stallInfo.visitor_count) errors.visitor_count = 'Visitor count is required.';
    if (!stallInfo.stall_model) errors.stall_model = 'Stall model is required.';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const handlePrev = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a new exhibition
      const exhibitionResponse = await axios.post("http://localhost:8090/exhibition", {
        "mobileNumber": formData.mobile_number,  // Match backend field names
        "organizerName": formData.organizer_name,
        "eventName": formData.event_name,
        "eventVenue": formData.event_venue,
        "venueType": formData.venue_type,
        "eventType": formData.event_type,
        "startDate": formData.start_date,
        "endDate": formData.end_date
      });
  
      const exhibitionId = exhibitionResponse.data.exhibitionId;  // Assuming response field
  
      // Prepare FormData for stall information
      const formDataToSend = new FormData();
      formDataToSend.append('totalStall', formData.stall_info.total_stall);
      formDataToSend.append('availableStall', formData.stall_info.available_stall);
      formDataToSend.append('stallType', formData.stall_info.stall_Type);
      formDataToSend.append('rent', formData.stall_info.rent);
      formDataToSend.append('stallModel', formData.stall_info.stall_model);
      formDataToSend.append('visitorCount', formData.stall_info.visitor_count);
      formDataToSend.append('exhibitionId', exhibitionId);
      if (formData.stall_info.event_poster) formDataToSend.append('eventPoster', formData.stall_info.event_poster);
      if (formData.stall_info.floor_plan) formDataToSend.append('floorPlan', formData.stall_info.floor_plan);
  
      // Post stall info with exhibition ID
      const stallResponse = await axios.post("http://localhost:8090/stall", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (stallResponse.data === 'Success') {
        Swal.fire({
          icon: 'success',
          title: 'Event Created Successfully',
          text: 'Event has been created successfully!',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate("/");
        });
      } else {
        throw new Error('Failure');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while creating the event.',
        confirmButtonText: 'OK'
      });
    }
  };

  // Set min date for start date and end date
  const minDate = new Date().toISOString().slice(0, 16);

  return (
      <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-xl">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="relative pt-1">
            <div className="flex mb-2">
              <div className={`w-1/3 text-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>Step 1</div>
              <div className={`w-1/3 text-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>Step 2</div>
              <div className={`w-1/3 text-center ${step === 3 ? 'text-blue-600' : 'text-gray-400'}`}>Step 3</div>
            </div>
            <div className="flex">
              <div className={`w-1/3 h-3 mr-4 rounded-xl bg-blue-600 ${step > 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`w-1/3 h-3 mr-4 rounded-xl ${step > 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`w-1/3 h-3 mr-4 rounded-xl ${step === 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            </div>
          </div>
        </div>

        <form>
          {step === 1 && (
            <CreateEvent
              formData={formData}
              handleFormDataChange={handleFormDataChange}
              errors={errors}
              minDate={minDate}
            />
          )}
          {step === 2 && (
            <StallInformation
              formData={formData}
              handleFormDataChange={handleFormDataChange}
              errors={errors}
            />
          )}
          {step === 3 && (
            <ReviewInformation formData={formData} />
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg"
              >
                Previous
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Next
              </button>
            ) : (
              <button
                type="button" // Change this to type="submit"
                onClick={handleSubmit}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
  );
};

export default MultiStepForm;




