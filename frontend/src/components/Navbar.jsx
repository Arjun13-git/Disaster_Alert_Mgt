import React from "react";
import {Link,useLocation} from 'react-router-dom';
import {FaHome,FaMapMarkerAlt,FaUser,FaRobot,FaMoon,FaSun,FaInfoCircle} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.png';

const Navbar=()=>{
    const location=useLocation();
    const { darkMode, toggleDarkMode } = useTheme();
    const isActive=(path)=>location.pathname===path;
    return(
    <nav className={darkMode ? 'dark-nav' : ''}>
      <div className="logo-container">
        <img src={logo} alt="Disaster Alert System Logo" className="nav-logo" />
      </div>
      <Link to="/home" className={isActive('/home') ? 'active' : ''}>
        <FaHome size={24} />
        <span>Home</span>
      </Link>
      <Link to="/location" className={isActive('/location') ? 'active' : ''}>
        <FaMapMarkerAlt size={24} />
        <span>Location</span>
      </Link>
      <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>
        <FaUser size={24} />
        <span>Profile</span>
      </Link>
      <Link to="/about" className={isActive('/about') ? 'active' : ''}>
        <FaInfoCircle size={24} />
        <span>About Us</span>
      </Link>
      <Link to="/chatbot" className={isActive('/chatbot') ? 'active' : ''}>
        <FaRobot size={24} />
        <span>AI Assist</span>
      </Link>
      <button onClick={toggleDarkMode} className="theme-toggle">
        {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
      </button>
    </nav>
    );
};
export default Navbar;