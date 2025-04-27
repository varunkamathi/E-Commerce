import React, { useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ cartItemCount, openCart }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Left: Logo */}
      <div className="text-2xl font-bold text-blue-600">
        Shopi
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6 text-gray-700 font-semibold">
        <Link to="/my-order" className="hover:text-blue-600">My Order</Link>
        <Link to="/my-account" className="hover:text-blue-600">My Account</Link>
        <button 
          onClick={openCart} 
          className="relative hover:text-blue-600"
        >
          <FaShoppingCart size={24} />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-gray-700">
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-6 bg-white shadow-md rounded-md flex flex-col items-start p-4 gap-4 text-gray-700 font-semibold md:hidden">
          <Link to="/my-order" className="hover:text-blue-600" onClick={toggleMenu}>My Order</Link>
          <Link to="/my-account" className="hover:text-blue-600" onClick={toggleMenu}>My Account</Link>
          <button 
            onClick={() => { openCart(); toggleMenu(); }} 
            className="relative hover:text-blue-600"
          >
            <FaShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
