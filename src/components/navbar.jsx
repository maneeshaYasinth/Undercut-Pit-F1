import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full shadow-lg navbar font-krona bg-gradient-to-b from-gray-800 to-gray-700  rounded-lg">
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center h-16">
          {/* Nav Links - Desktop */}
          <div className="hidden sm:flex sm:items-center sm:justify-center flex-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/carData">Car Data</NavLink>
            <NavLink to="/DriverInfo">Driver Info</NavLink>
            <NavLink to="/TeamRadio">Team Radio</NavLink>
            <NavLink to="/SessionInfo">Session Info</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden absolute right-4">
            <button className="p-2 text-white rounded-md" onClick={toggleMenu}>
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar - Mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Sidebar Content */}
          <div className="w-full h-full bg-gradient-to-r from-red-700 to-red-500 p-4 space-y-4 transition-transform duration-300 ease-in-out transform backdrop-filter backdrop-blur-lg shadow-lg">
            {/* Close Button */}
            <div className="flex items-center justify-between">
              <button className="text-white focus:outline-none" onClick={toggleMenu}>
                <FiX className="w-10 h-10" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col items-center space-y-4  " onClick={toggleMenu}>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/carData">Car Data</NavLink>
              <NavLink to="/DriverInfo">Driver Info</NavLink>
              <NavLink to="/TeamRadio">Team Radio</NavLink>
              <NavLink to="/SessionInfo">Session Info</NavLink>
            </div>
          </div>

          {/* Overlay - Close Sidebar on Click */}
          {/* <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMenu}></div> */}
        </div>
      )}
    </nav>
  );
};

// NavLink Component for Consistency
const NavLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="relative px-4 py-2 text-lg font-medium text-white rounded-full 
                 hover:text-pink-100
                 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-yellow-600 
                 after:left-0 after:bottom-0 after:transition-transform after:duration-300 
                 after:scale-x-0 hover:after:scale-x-100 
                 after:shadow-[0_0_10px_gold,0_0_20px_gold,0_0_30px_gold]"
    >
      {children}
    </Link>
  );
};

export default Navbar;
