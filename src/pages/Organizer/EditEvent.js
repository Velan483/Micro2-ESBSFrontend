import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTimes } from 'react-icons/fa';

const EditEvent = ({ stall, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        totalStall: '',
        availableStall: '',
        stallType: '',
        rent: '',
        stallModel: '',
        visitorCount: '',
        eventPoster: null,
        floorPlan: null,
        exhibitionName: '',
        exhibitionOrganizer: '',
        exhibitionVenue: '',
        exhibitionStartDate: '',
        exhibitionEndDate: '',
        exhibitionVenueType: '',
        exhibitionEventType: ''
    });

    useEffect(() => {
        if (stall) {
            setFormData({
                totalStall: stall.totalStall,
                availableStall: stall.availableStall,
                stallType: stall.stallType,
                rent: stall.rent,
                stallModel: stall.stallModel,
                visitorCount: stall.visitorCount,
                eventPoster: null,
                floorPlan: null,
                exhibitionName: stall.exhibition.eventName,
                exhibitionOrganizer: stall.exhibition.organizerName,
                exhibitionVenue: stall.exhibition.eventVenue,
                exhibitionStartDate: new Date(stall.exhibition.startDate).toISOString().split('T')[0],
                exhibitionEndDate: new Date(stall.exhibition.endDate).toISOString().split('T')[0],
                exhibitionVenueType: stall.exhibition.venueType,
                exhibitionEventType: stall.exhibition.eventType
            });
        }
    }, [stall]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('stallId', stall.stallId);
        form.append('totalStall', formData.totalStall);
        form.append('availableStall', formData.availableStall);
        form.append('stallType', formData.stallType);
        form.append('rent', formData.rent);
        form.append('stallModel', formData.stallModel);
        form.append('visitorCount', formData.visitorCount);
        form.append('exhibitionId', stall.exhibition.exhibitionId);

        if (formData.eventPoster) form.append('eventPoster', formData.eventPoster);
        if (formData.floorPlan) form.append('floorPlan', formData.floorPlan);

        form.append('exhibitionName', formData.exhibitionName);
        form.append('exhibitionOrganizer', formData.exhibitionOrganizer);
        form.append('exhibitionVenue', formData.exhibitionVenue);
        form.append('exhibitionStartDate', formData.exhibitionStartDate);
        form.append('exhibitionEndDate', formData.exhibitionEndDate);
        form.append('exhibitionVenueType', formData.exhibitionVenueType);
        form.append('exhibitionEventType', formData.exhibitionEventType);

        try {
            const response = await axios.put('http://localhost:8090/stall', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Swal.fire('Success!', response.data, 'success');
            onUpdate(); // Notify parent to refresh data
            onClose();
        } catch (error) {
            Swal.fire('Error!', 'Failed to update stall and exhibition details', 'error');
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <FaTimes size={20} />
                </button>
                <h2 className="text-xl font-semibold mb-4 text-center">Edit Stall and Exhibition Details</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Stall Details */}
                    <div className="col-span-1">
                        <label className="block text-gray-700">Total Stalls</label>
                        <input
                            type="number"
                            name="totalStall"
                            value={formData.totalStall}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                            required
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-gray-700">Available Stalls</label>
                        <input
                            type="number"
                            name="availableStall"
                            value={formData.availableStall}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                            required
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-gray-700">Stall Type</label>
                        <input
                            type="text"
                            name="stallType"
                            value={formData.stallType}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                            required
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-gray-700">Rent Per Day</label>
                        <input
                            type="number"
                            name="rent"
                            value={formData.rent}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                            required
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-gray-700">Stall Model</label>
                        <input
                            type="text"
                            name="stallModel"
                            value={formData.stallModel}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                            required
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-gray-700">Visitor Count</label>
                        <input
                            type="number"
                            name="visitorCount"
                            value={formData.visitorCount}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                            required
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-gray-700">Event Poster</label>
                        <input
                            type="file"
                            name="eventPoster"
                            onChange={handleChange}
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-gray-700">Floor Plan</label>
                        <input
                            type="file"
                            name="floorPlan"
                            onChange={handleChange}
                            className="mt-1 block w-full"
                        />
                    </div>

                    {/* Exhibition Details */}
                    <div className="col-span-1">
                        <label className="block text-gray-700">Exhibition Name</label>
                        <input
                            type="text"
                            name="exhibitionName"
                            value={formData.exhibitionName}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-gray-700">Exhibition Organizer</label>
                        <input
                            type="text"
                            name="exhibitionOrganizer"
                            value={formData.exhibitionOrganizer}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-gray-700">Exhibition Venue</label>
                        <input
                            type="text"
                            name="exhibitionVenue"
                            value={formData.exhibitionVenue}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-gray-700">Exhibition Start Date</label>
                        <input
                            type="date"
                            name="exhibitionStartDate"
                            value={formData.exhibitionStartDate}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-gray-700">Exhibition End Date</label>
                        <input
                            type="date"
                            name="exhibitionEndDate"
                            value={formData.exhibitionEndDate}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-gray-700">Exhibition Venue Type</label>
                        <input
                            type="text"
                            name="exhibitionVenueType"
                            value={formData.exhibitionVenueType}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-gray-700">Exhibition Event Type</label>
                        <input
                            type="text"
                            name="exhibitionEventType"
                            value={formData.exhibitionEventType}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>

                    <div className="col-span-2 flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEvent;
