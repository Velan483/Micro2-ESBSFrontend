import React from 'react';

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-slideRight">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Our Services</h1>

        <div className="bg-white shadow-lg rounded-lg p-8 mb-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Feature
              title="Stall Availability"
              description="Display real-time availability of stalls."
              imageSrc="https://3.imimg.com/data3/YR/SS/MY-8793347/octornum-stall-500x500.jpg"
            />
            <Feature
              title="Booking System"
              description="Allow users to book stalls online, including selecting specific locations."
              imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpLgzN7kzS84ffRptfudI6m8V9zMv7JVcV0NrLTBRplrsKFrWfJ0JvKhWUBMTIguAnJ6k&usqp=CAU"
            />
            <Feature
              title="Payment Integration"
              description="Support various payment methods for booking fees."
              imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjHzYUqhkmidrXAPILvg2QYzARDoCKToR7gA&s"
            />
            <Feature
              title="User Profiles"
              description="Enable users to create and manage their profiles and booking history."
              imageSrc="https://media.sproutsocial.com/uploads/2013/10/permissions_Intro-500x260-03.png"
            />
            <Feature
              title="Notifications"
              description="Send confirmations, reminders, and updates about bookings."
              imageSrc="https://www.mindinventory.com/blog/wp-content/uploads/2022/10/push-notification.jpg"
            />
            <Feature
              title="Floor Plan Visualization"
              description="Provide a visual representation of the exhibition floor plan with available and booked stalls."
              imageSrc="https://t4.ftcdn.net/jpg/06/16/99/35/360_F_616993535_XbUT2iLs0nsrhCtgH46wSdPvUIrGij1X.jpg"
            />
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 mb-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Modules</h2>
          <div className="space-y-6">
            <Module
              title="Exhibition Organizer Module"
              imageSrc="https://www.akseleran.co.id/blog/wp-content/uploads/2021/10/Akseleran-Blog-Foto-15.jpg"
              details={[
                "Organizer Registration: Organizers fill out a form with relevant details.",
                "Organizer Login: Log in using registered credentials (email and password).",
                "Exhibition Management: Set up new events, including dates, locations, and details about the exhibition.",
                "Stall Management: Define the number of stalls, their sizes, and their locations within the floor plan.",
                "Booking Management: Handle bookings made by stall exhibitors, including approvals and modifications.",
                "Payment Management: Track and manage payments related to bookings."
              ]}
            />
            <Module
              title="Stall Exhibitor Module"
              imageSrc="https://executiveevents.in/Userfiles/services/35760184715a4906b56ad8e9aa3758fe.jpg"
              details={[
                "Exhibitor Registration: Exhibitors fill out a form with relevant details.",
                "Exhibitor Login: Log in using registered credentials (email and password).",
                "Stall Booking: Browse available stalls, book stalls, and view floor plans.",
                "Manage Bookings: View and manage their own booking history.",
                "Make Payments: Complete payments for stall bookings using various payment methods.",
                "Notifications: Receive booking confirmations, reminders, and updates."
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ title, description, imageSrc }) => (
  <div className="bg-gray-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-200 duration-300 ease-in-out">
    <img src={imageSrc} alt={title} className="w-full h-32 object-cover rounded-lg mb-4" />
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Module = ({ title, details, imageSrc }) => (
  <div className="bg-gray-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-100 hover:shadow-2xl hover:bg-gray-100 duration-200 ease-in-out">
    <img src={imageSrc} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h3>
    <ul className="list-disc list-inside space-y-2">
      {details.map((detail, index) => (
        <li key={index} className="text-gray-600">{detail}</li>
      ))}
    </ul>
  </div>
);

export default Services;
