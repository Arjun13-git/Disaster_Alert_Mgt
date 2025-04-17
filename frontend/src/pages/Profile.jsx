import React, { useState, useContext } from 'react';
import { data } from '../context/Usercontext';
import { FaUser } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    let {userdata, setuserdata,getdata,serverUrl} = useContext(data)
    let navigate= useNavigate()
  const [showModal, setShowModal] = useState(false);
  const { darkMode } = useTheme();

  const handleProfileClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    navigate("/home")
  };
  const handlelogout = async () => {
    try {
        let data1 = await axios.post(serverUrl + "/logout", { withCredentials: true })
        setuserdata(null)
        console.log(data1)
        navigate("/login")
    } catch (err) {
        console.log(err)
    }
}
  const userData = userdata || {
    name: "Demo User",
    email: "user@example.com",
    phone: "123-456-7890",
    location: "City, Country"
  };

  return (
    <div className="profile-container">
      

      
        <div className="modal-overlay">
          <div className={`modal-content profile-modal ${darkMode ? 'dark-mode' : ''}`}>
            <h2 className="modal-title">User Profile</h2>
            <div className="profile-details">
              <div className="profile-avatar">
                <FaUser size={80} />
              </div>
              <div className="profile-info">
                <p><strong>Name:</strong> {userData.Username}</p>
                <p><strong>Email:</strong> {userData.email}</p>
              </div>
            </div>
            <button className="logout-button" onClick={handlelogout}>
              Logout
            </button>
            <button className="close-button" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
     
    </div>
  );
};

export default Profile;

