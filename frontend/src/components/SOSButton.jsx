import React, { useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';

const SOSButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSOSClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCall = () => {
    window.location.href = 'tel:999';
  };

  return (
    <>
      <button className="floating-sos-button" onClick={handleSOSClick}>
        SOS
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Emergency Alert</h2>
            <p>Do you need to call emergency services?</p>
            <p>Emergency Number: <strong>999</strong></p>
            <div>
              <button className="call-button" onClick={handleCall}>
                <FaPhoneAlt /> Call Now
              </button>
              <button className="close-button" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SOSButton; 