import React from "react";
import {Link,useLocation} from 'react-router-dom';
import {FaHome,FaMapMarkerAlt,FaUser,FaPhoneAlt} from 'react-icons/fa';
const Navbar=()=>{
    const location=useLocation();
    const isActive=(path)=>location.pathname===path;
    return(
    <nav>
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
      <Link to="/sos" className={isActive('/sos') ? 'active' : ''}>
        <FaPhoneAlt size={24} />
        <span>SOS</span>
      </Link>
    </nav>
    );
};
export default Navbar;