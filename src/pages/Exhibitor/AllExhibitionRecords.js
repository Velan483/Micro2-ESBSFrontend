// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AllExhibitionRecords = () => {
//   const [exhibitions, setExhibitions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [venueCounts, setVenueCounts] = useState({});

//   useEffect(() => {
//     // Fetch data from the server
//     axios.get('http://localhost:8090/exhibition/all')
//       .then(response => {
//         // Update state with the fetched data
//         const fetchedExhibitions = response.data;
//         setExhibitions(fetchedExhibitions);
//         setLoading(false);

//         // Count the occurrences of each eventVenue
//         const counts = fetchedExhibitions.reduce((acc, exhibition) => {
//           const venue = exhibition.eventVenue;
//           acc[venue] = (acc[venue] || 0) + 1;
//           return acc;
//         }, {});

//         setVenueCounts(counts);
//       })
//       .catch(error => {
//         // Handle any errors
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h1>Exhibition Venues</h1>
//       <ul>
//         {Object.entries(venueCounts).map(([venue, count]) => (
//           <li key={venue}>{venue} - {count}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AllExhibitionRecords;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DistrictSelector from './Cities'; // Import DistrictSelector

const AllExhibitionRecords = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [venueCounts, setVenueCounts] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8090/exhibition/all')
      .then(response => {
        const fetchedExhibitions = response.data;
        setExhibitions(fetchedExhibitions);
        setLoading(false);

        const counts = fetchedExhibitions.reduce((acc, exhibition) => {
          const venue = exhibition.eventVenue;
          acc[venue] = (acc[venue] || 0) + 1;
          return acc;
        }, {});

        setVenueCounts(counts);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <DistrictSelector venueCounts={venueCounts} />
    </div>
  );
};

export default AllExhibitionRecords;

