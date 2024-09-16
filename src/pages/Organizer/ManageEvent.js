import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaMapMarkerAlt, FaCalendarAlt, FaPhone, FaImage, FaChartBar, FaEdit, FaTrash, FaBuilding, FaTag } from 'react-icons/fa';
import EditEvent from './EditEvent'; // Import the EditEvent component

const ManageEvent = () => {
    const [stalls, setStalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [currentStall, setCurrentStall] = useState(null);

    useEffect(() => {
        const fetchStallData = async () => {
            try {
                const name = sessionStorage.getItem('name');
                if (!name) {
                    throw new Error('Name not found in session storage');
                }

                const url = `http://localhost:8090/stall/name/${name}`;
                const response = await axios.get(url);

                setStalls(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchStallData();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this record?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:8090/stall/${id}`)
                    .then(() => {
                        Swal.fire('Deleted!', 'The record has been deleted.', 'success');
                        setStalls(stalls.filter(stall => stall.stallId !== id));
                    })
                    .catch((err) => {
                        Swal.fire('Error!', 'There was an error deleting the record.', 'error');
                        console.log(err);
                    });
            }
        });
    };

    const handleEdit = (stall) => {
        setCurrentStall(stall);
        setEditModalVisible(true);
    };

    const handleUpdate = async () => {
        try {
            // Refresh records after update
            const response = await axios.get(`http://localhost:8090/stall/name/${sessionStorage.getItem('name')}`);
            setStalls(response.data);
        } catch (error) {
            console.error('Failed to refresh data', error);
        }
    };

    if (loading) return <p className="text-center text-lg text-gray-400">Loading...</p>;
    if (error) return <p className="text-center text-lg text-red-600">Error: {error}</p>;

    return (
        <div className="container mx-auto p-6 min-h-screen">
            {stalls.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stalls.map((stall) => (
                        <div key={stall.stallId} className="relative p-6 rounded-xl bg-white shadow-lg border border-gray-300 transition-transform transform hover:scale-105">
                            {/* Edit and Delete Buttons */}
                            <div className="absolute top-4 right-4 flex space-x-2">
                                <button className="text-slate-500 hover:text-green-600" onClick={() => handleEdit(stall)}>
                                    <FaEdit size={20} />
                                </button>
                                <button className="text-slate-500 hover:text-red-800" onClick={() => handleDelete(stall.stallId)}>
                                    <FaTrash size={20} />
                                </button>
                            </div>

                            {/* Header Section */}
                            <h1 className="text-3xl font-bold mb-4 text-center text-blue-900">{stall.exhibition.eventName}</h1>
                            <h2 className="text-xl font-semibold mb-2 text-center text-gray-800">Organized by: {stall.exhibition.organizerName}</h2>
                            <h2 className="text-md font-semibold mb-4 text-center text-gray-800"><FaPhone className="inline mr-2" />{stall.exhibition.mobileNumber}</h2>

                            {/* First Row: Event Poster and Event Details */}
                            <div className="flex flex-wrap mb-6">
                                {stall.eventPoster && (
                                    <div className="w-full md:w-1/2 lg:w-1/2 p-2">
                                        <h2 className="text-xl text-center font-bold mb-2 text-blue-700">Event Poster</h2>
                                        <div className="p-4">
                                            <img src={`data:image/jpeg;base64,${stall.eventPoster}`} alt="Event Poster" className="w-full h-auto rounded-lg shadow-md" />
                                        </div>
                                    </div>
                                )}
                                <div className={`w-full ${stall.eventPoster ? 'md:w-1/2' : 'md:w-full'} p-2`}>
                                    <h2 className="text-xl font-bold mb-2 text-blue-700">Event Details</h2>
                                    <p className="text-lg mb-1 text-gray-700"><FaMapMarkerAlt className="inline mr-2" /><strong>Venue:</strong> {stall.exhibition.eventVenue}</p>
                                    <p className="text-lg mb-1 text-gray-700"><FaCalendarAlt className="inline mr-2" /><strong>Start Date:</strong> {new Date(stall.exhibition.startDate).toLocaleDateString()}</p>
                                    <p className="text-lg mb-1 text-gray-700"><FaCalendarAlt className="inline mr-2" /><strong>End Date:</strong> {new Date(stall.exhibition.endDate).toLocaleDateString()}</p>
                                    <p className="text-lg mb-1 text-gray-700"><FaBuilding className="inline mr-2" /><strong>Venue Type:</strong> {stall.exhibition.venueType}</p>
                                    <p className="text-lg mb-4 text-gray-700"><FaTag className="inline mr-2" /><strong>Event Type:</strong> {stall.exhibition.eventType}</p>
                                </div>
                            </div>

                            {/* Second Row: Floor Plan and Stall Details */}
                            <div className="flex flex-wrap">
                                {stall.floorPlan && (
                                    <div className="w-full md:w-1/2 lg:w-1/2 p-2">
                                        <h2 className="text-xl text-center font-bold mb-2 text-blue-700">Floor Plan</h2>
                                        <div className="p-4">
                                            <img src={`data:image/jpeg;base64,${stall.floorPlan}`} alt="Floor Plan" className="w-full h-auto rounded-lg shadow-md" />
                                        </div>
                                    </div>
                                )}
                                <div className={`w-full ${stall.floorPlan ? 'md:w-1/2' : 'md:w-full'} p-2`}>
                                    <h2 className="text-xl font-bold mb-2 text-blue-700">Stall Details</h2>
                                    <p className="text-lg mb-1 text-gray-700"><FaChartBar className="inline mr-2" /><strong>Total Stalls:</strong> {stall.totalStall}</p>
                                    <p className="text-lg mb-1 text-gray-700"><FaChartBar className="inline mr-2" /><strong>Available Stalls:</strong> {stall.availableStall}</p>
                                    <p className="text-lg mb-1 text-gray-700"><FaChartBar className="inline mr-2" /><strong>Stall Type:</strong> {stall.stallType}</p>
                                    <p className="text-lg mb-1 text-gray-700"><FaChartBar className="inline mr-2" /><strong>Rent Per Day:</strong> {stall.rent}</p>
                                    <p className="text-lg mb-1 text-gray-700"><FaChartBar className="inline mr-2" /><strong>Stall Model:</strong> {stall.stallModel}</p>
                                    <p className="text-lg mb-4 text-gray-700"><FaChartBar className="inline mr-2" /><strong>Visitor Count:</strong> {stall.visitorCount}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="m-96 text-center text-2xl text-red-600">No Event data available</p>
            )}

            {/* Edit Event Modal */}
            {editModalVisible && currentStall && (
                <EditEvent
                    stall={currentStall}
                    onClose={() => setEditModalVisible(false)}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default ManageEvent;
