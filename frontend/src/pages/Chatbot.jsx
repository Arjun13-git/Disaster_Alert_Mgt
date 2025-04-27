import React, { useState } from 'react';
import { FaPaperPlane, FaMicrophone, FaPaperclip, FaUpload } from 'react-icons/fa';

const Chatbot = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() !== '') {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-overlay">
        <h2>AI Assistance</h2>
        
        <div className="chatbot-box">
       

        <div className="chatbot-input-container">
          <button className="icon-button">
            <FaPaperclip size={20} />
          </button>

          <button className="icon-button">
            <FaMicrophone size={20} />
          </button>
          <button className="icon-button">
            <FaUpload size={20} />
          </button>

          <input
            type="text"
            placeholder="Hi! How can I assist you today?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          />

          <button className="icon-button send-button" onClick={handleSend}>
            <FaPaperPlane size={20} />
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
