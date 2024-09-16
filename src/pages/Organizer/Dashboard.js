import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faCalendarCheck,
  faDollarSign,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import CreateEvent from "./CreateEvent";
import ManageEvent from "./ManageEvent";
import TrackPayment from "./TrackPayment";
import ViewBooking from "./ViewBooking";
import MultiStepForm from "./MultiStepForm";

const Dashboard = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [activeComponent, setActiveComponent] = useState("create-event");

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "create-event":
        return <MultiStepForm />;
      case "manage-event":
        return <ManageEvent />;
      case "view-booking":
        return <ViewBooking />;
      case "track-payment":
        return <TrackPayment />;
      default:
        return <CreateEvent />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gray-800 text-white transition-transform duration-300 transform ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-72 md:flex md:flex-col shadow-lg`}
      >
        <div className="p-6 flex items-center justify-between border-b border-gray-700">
          <h2 className="text-xl font-bold md:hidden">Admin Dashboard</h2>
          <button
            className="text-white hover:text-gray-400 focus:outline-none md:hidden"
            onClick={toggleSidebar}
          >
            &#8230;
          </button>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <span className="block px-6 py-3 text-gray-300 font-semibold">
                Dashboard
              </span>
            </li>
            <li>
              <button
                className={`flex items-center px-6 py-3 w-full text-left transition duration-200 ease-in-out ${
                  activeComponent === "create-event"
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-700 hover:text-white"
                }`}
                onClick={() => setActiveComponent("create-event")}
              >
                <FontAwesomeIcon icon={faCalendarPlus} className="mr-3" />
                Create Event
              </button>
            </li>
            <li>
              <button
                className={`flex items-center px-6 py-3 w-full text-left transition duration-200 ease-in-out ${
                  activeComponent === "manage-event"
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-700 hover:text-white"
                }`}
                onClick={() => setActiveComponent("manage-event")}
              >
                <FontAwesomeIcon icon={faCalendarCheck} className="mr-3" />
                Manage Event
              </button>
            </li>
            <li>
              <button
                className={`flex items-center px-6 py-3 w-full text-left transition duration-200 ease-in-out ${
                  activeComponent === "view-booking"
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-700 hover:text-white"
                }`}
                onClick={() => setActiveComponent("view-booking")}
              >
                <FontAwesomeIcon icon={faEye} className="mr-3" />
                View Bookings
              </button>
            </li>
            <li>
              <button
                className={`flex items-center px-6 py-3 w-full text-left transition duration-200 ease-in-out ${
                  activeComponent === "track-payment"
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-700 hover:text-white"
                }`}
                onClick={() => setActiveComponent("track-payment")}
              >
                <FontAwesomeIcon icon={faDollarSign} className="mr-3" />
                Track Payment
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
