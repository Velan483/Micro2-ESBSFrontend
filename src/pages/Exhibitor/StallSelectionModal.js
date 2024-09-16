 import React, { useState, useEffect } from 'react';

const StallSelectionModal = ({ totalStall, availableStall, stallId, onClose, onStallSelect }) => {
  const [selectedStalls, setSelectedStalls] = useState([]);
  const [bookedStalls, setBookedStalls] = useState([]);

  useEffect(() => {
    // Generate a unique key for localStorage based on the stallId
    const localStorageKey = `bookedStalls_${stallId}`;

    // Retrieve booked stalls from localStorage
    const storedBookedStalls = localStorage.getItem(localStorageKey);

    if (storedBookedStalls) {
      // If booked stalls are already in localStorage, use them
      setBookedStalls(JSON.parse(storedBookedStalls));
    } else {
      // Calculate the number of booked stalls
      const bookedCount = totalStall - availableStall;

      // Generate random booked stalls based on the count
      const generateRandomBookedStalls = (total, count) => {
        const allStalls = Array.from({ length: total }, (_, index) => index + 1);
        const shuffled = allStalls.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      };

      const bookedStallsArray = generateRandomBookedStalls(totalStall, bookedCount);

      // Save the booked stalls to localStorage
      localStorage.setItem(localStorageKey, JSON.stringify(bookedStallsArray));

      // Set the booked stalls in state
      setBookedStalls(bookedStallsArray);
    }
  }, [totalStall, availableStall, stallId]);

  const handleStallClick = (stallNumber) => {
    if (bookedStalls.includes(stallNumber)) return; // Prevent selecting booked stalls

    if (selectedStalls.includes(stallNumber)) {
      setSelectedStalls(selectedStalls.filter(stall => stall !== stallNumber));
    } else {
      setSelectedStalls([...selectedStalls, stallNumber]);
    }
  };

  const handleConfirm = () => {
    // Update the booked stalls in localStorage
    const localStorageKey = `bookedStalls_${stallId}`;
    const updatedBookedStalls = [...bookedStalls, ...selectedStalls];
    localStorage.setItem(localStorageKey, JSON.stringify(updatedBookedStalls));
    setBookedStalls(updatedBookedStalls); // Update state to reflect new booked stalls
    onStallSelect(selectedStalls); // Notify parent of the selected stalls
  };

  const stalls = Array.from({ length: totalStall }, (_, index) => index + 1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Select Stalls</h2>
        <div className="max-h-96 overflow-y-auto mb-4">
          <div className="grid grid-cols-5 gap-4">
            {stalls.map(stall => (
              <div
                key={stall}
                onClick={() => handleStallClick(stall)}
                className={`p-4 border rounded cursor-pointer ${
                  bookedStalls.includes(stall) ? 'bg-red-500 text-white cursor-not-allowed' :
                  selectedStalls.includes(stall) ? 'bg-blue-500 text-white' :
                  'bg-gray-100'
                }`}
              >
                Stall {stall}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-full"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="bg-blue-600 text-white px-4 py-2 rounded-full"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default StallSelectionModal;




