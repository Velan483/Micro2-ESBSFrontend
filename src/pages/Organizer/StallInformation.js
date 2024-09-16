// import React from 'react';

// const stallTypes = [
//   "Full Stall", "Half Stall", "Food Stall", "Special Stall", "Promotional Stall"
// ];

// const stallModels = [
//   "Open Table", "Canopy", "Octanorm"
// ];

// const StallInformation = ({ formData, handleFormDataChange, errors }) => {
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       handleFormDataChange({ stall_info: { ...formData.stall_info, [name]: value } });
//     };
  
//     return (
// <div>
//   <h1 className="text-2xl font-bold mb-6">Stall Information</h1>
//   <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
//     {/* Total Stall */}
//     <div>
//       <label htmlFor="total_stall" className="block text-gray-700 font-semibold mb-2">Total Stall</label>
//       <input
//         type="number"
//         id="total_stall"
//         name="total_stall"
//         value={formData.stall_info.total_stall || ''}
//         onChange={handleChange}
//         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         required
//       />
//       {errors.total_stall && <p className="text-red-600">{errors.total_stall}</p>}
//     </div>

//     {/* Available Stall */}
//     <div>
//       <label htmlFor="available_stall" className="block text-gray-700 font-semibold mb-2">Available Stall</label>
//       <input
//         type="number"
//         id="available_stall"
//         name="available_stall"
//         value={formData.stall_info.available_stall || ''}
//         onChange={handleChange}
//         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         required
//       />
//       {errors.available_stall && <p className="text-red-600">{errors.available_stall}</p>}
//     </div>

//     {/* Stall Type */}
//     <div>
//       <label htmlFor="stall_Type" className="block text-gray-700 font-semibold mb-2">Stall Type</label>
//       <select
//         id="stall_Type"
//         name="stall_Type"
//         value={formData.stall_info.stall_Type || ''}
//         onChange={handleChange}
//         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         required
//       >
//         <option value="">Select Stall Type</option>
//         {stallTypes.map(type => (
//           <option key={type} value={type}>{type}</option>
//         ))}
//       </select>
//       {errors.stall_Type && <p className="text-red-600">{errors.stall_Type}</p>}
//     </div>

//     {/* Rent Per Day */}
//     <div>
//       <label htmlFor="rent" className="block text-gray-700 font-semibold mb-2">Rent Per Day</label>
//       <input
//         type="number"
//         id="rent"
//         name="rent"
//         value={formData.stall_info.rent || ''}
//         onChange={handleChange}
//         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         required
//       />
//       {errors.rent && <p className="text-red-600">{errors.rent}</p>}
//     </div>

//     {/* Stall Model and Visitor Count */}
//     <div className="md:col-span-2">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Stall Model */}
//         <div>
//           <p className="block text-gray-700 font-semibold mb-2">Stall Model</p>
//           <div className="flex items-center space-x-6">
//             {stallModels.map(model => (
//               <label key={model} className="flex items-center">
//                 <input
//                   type="radio"
//                   id={model}
//                   name="stall_model"
//                   value={model}
//                   checked={formData.stall_info.stall_model === model}
//                   onChange={handleChange}
//                   className="form-radio h-4 w-4 text-blue-600"
//                 />
//                 <span className="ml-2">{model}</span>
//               </label>
//             ))}
//           </div>
//           {errors.stall_model && <p className="text-red-600">{errors.stall_model}</p>}
//         </div>

//         {/* Visitor Count */}
//         <div>
//           <label htmlFor="visitor_count" className="block text-gray-700 font-semibold mb-2">Expected Visitor Count</label>
//           <input
//             type="number"
//             id="visitor_count"
//             name="visitor_count"
//             value={formData.stall_info.visitor_count || ''}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           {errors.visitor_count && <p className="text-red-600">{errors.visitor_count}</p>}
//         </div>
//       </div>
//     </div>

//     {/* File Uploads */}
//     <div className="col-span-1 md:col-span-2">
//       <label className="block text-gray-700 font-semibold mb-2">Upload Files</label>
//       <div className="flex space-x-6">
//         <div className="flex-1">
//           <label htmlFor="event_poster" className="block text-gray-700 mb-1">Event Poster</label>
//           <input
//             type="file"
//             id="event_poster"
//             name="event_poster"
//             onChange={(e) => handleFormDataChange({ stall_info: { ...formData.stall_info, event_poster: e.target.files[0] } })}
//             className="w-full border border-gray-300 rounded-lg p-2"
//           />
//           {errors.event_poster && <p className="text-red-600">{errors.event_poster}</p>}
//         </div>

//         <div className="flex-1">
//           <label htmlFor="floor_plan" className="block text-gray-700 mb-1">Floor Plan</label>
//           <input
//             type="file"
//             id="floor_plan"
//             name="floor_plan"
//             onChange={(e) => handleFormDataChange({ stall_info: { ...formData.stall_info, floor_plan: e.target.files[0] } })}
//             className="w-full border border-gray-300 rounded-lg p-2"
//           />
//           {errors.floor_plan && <p className="text-red-600">{errors.floor_plan}</p>}
//         </div>
//       </div>
//     </div>
//   </form>
// </div>

//     );
//   };
  
//   export default StallInformation;

import React from 'react';
import CustomSelectWithCheckbox from './CustomSelectWithCheckbox'; // Ensure correct import path

const stallTypes = [
  "Full Stall", "Half Stall", "Food Stall", "Special Stall", "Promotional Stall"
];

const stallModels = [
  "Open Table", "Canopy", "Octanorm"
];

const StallInformation = ({ formData, handleFormDataChange, errors }) => {
  const handleSelectChange = (selectedValues, field) => {
    handleFormDataChange({ stall_info: { ...formData.stall_info, [field]: selectedValues } });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Stall Information</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Stall */}
        <div>
          <label htmlFor="total_stall" className="block text-gray-700 font-semibold mb-2">Total Stall</label>
          <input
            type="number"
            id="total_stall"
            name="total_stall"
            value={formData.stall_info.total_stall || ''}
            onChange={(e) => handleFormDataChange({ stall_info: { ...formData.stall_info, total_stall: e.target.value } })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.total_stall && <p className="text-red-600">{errors.total_stall}</p>}
        </div>

        {/* Available Stall */}
        <div>
          <label htmlFor="available_stall" className="block text-gray-700 font-semibold mb-2">Available Stall</label>
          <input
            type="number"
            id="available_stall"
            name="available_stall"
            value={formData.stall_info.available_stall || ''}
            onChange={(e) => handleFormDataChange({ stall_info: { ...formData.stall_info, available_stall: e.target.value } })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.available_stall && <p className="text-red-600">{errors.available_stall}</p>}
        </div>

        {/* Stall Type */}
        <div>
          <label htmlFor="stall_Type" className="block text-gray-700 font-semibold mb-2">Stall Type</label>
          <CustomSelectWithCheckbox
            value={formData.stall_info.stall_Type || []}
            onChange={(selectedValues) => handleSelectChange(selectedValues, 'stall_Type')}
            options={stallTypes}
            placeholder="Select Stall Types"
          />
          {errors.stall_Type && <p className="text-red-600">{errors.stall_Type}</p>}
        </div>

        {/* Stall Model */}
        <div>
          <label htmlFor="stall_model" className="block text-gray-700 font-semibold mb-2">Stall Model</label>
          <CustomSelectWithCheckbox
            value={formData.stall_info.stall_model || []}
            onChange={(selectedValues) => handleSelectChange(selectedValues, 'stall_model')}
            options={stallModels}
            placeholder="Select Stall Models"
          />
          {errors.stall_model && <p className="text-red-600">{errors.stall_model}</p>}
        </div>

        {/* Rent Per Day and Expected Visitor Count */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rent Per Day */}
          <div>
            <label htmlFor="rent" className="block text-gray-700 font-semibold mb-2">Rent Per Day</label>
            <input
              type="number"
              id="rent"
              name="rent"
              value={formData.stall_info.rent || ''}
              onChange={(e) => handleFormDataChange({ stall_info: { ...formData.stall_info, rent: e.target.value } })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.rent && <p className="text-red-600">{errors.rent}</p>}
          </div>

          {/* Expected Visitor Count */}
          <div>
            <label htmlFor="visitor_count" className="block text-gray-700 font-semibold mb-2">Expected Visitor Count</label>
            <input
              type="number"
              id="visitor_count"
              name="visitor_count"
              value={formData.stall_info.visitor_count || ''}
              onChange={(e) => handleFormDataChange({ stall_info: { ...formData.stall_info, visitor_count: e.target.value } })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.visitor_count && <p className="text-red-600">{errors.visitor_count}</p>}
          </div>
        </div>

        {/* File Uploads */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">Upload Files</label>
          <div className="flex space-x-6">
            <div className="flex-1">
              <label htmlFor="event_poster" className="block text-gray-700 mb-1">Event Poster</label>
              <input
                type="file"
                id="event_poster"
                name="event_poster"
                onChange={(e) => handleFormDataChange({ stall_info: { ...formData.stall_info, event_poster: e.target.files[0] } })}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              {errors.event_poster && <p className="text-red-600">{errors.event_poster}</p>}
            </div>

            <div className="flex-1">
              <label htmlFor="floor_plan" className="block text-gray-700 mb-1">Floor Plan</label>
              <input
                type="file"
                id="floor_plan"
                name="floor_plan"
                onChange={(e) => handleFormDataChange({ stall_info: { ...formData.stall_info, floor_plan: e.target.files[0] } })}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              {errors.floor_plan && <p className="text-red-600">{errors.floor_plan}</p>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StallInformation;

