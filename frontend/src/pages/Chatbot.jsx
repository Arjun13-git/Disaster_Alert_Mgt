import React, { useState } from 'react';
import { FaPaperPlane, FaMicrophone, FaPaperclip, FaUpload } from 'react-icons/fa';
import axios from 'axios'; // Axios for easy API requests

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]); // Store messages

  const handleSend = async () => {
    if (message.trim() === '') return;

    // Add user's message to chat
    setChat(prev => [...prev, { type: 'user', text: message }]);

    try {
      const response = await axios.post('https://backend-ai-jw1g.onrender.com/', {
        message: message,
      });

      // Add bot's response to chat
      setChat(prev => [...prev, { type: 'user', text: message }, { type: 'bot', text: response.data.reply }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setChat(prev => [...prev, { type: 'bot', text: "Error contacting server." }]);
    }

    setMessage('');
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-overlay">
        <h2>AI Assistance</h2>

        <div className="chatbot-box">
          {chat.map((item, index) => (
            <div key={index} className={item.type === 'user' ? 'chat-user' : 'chat-bot'}>
              {item.text}
            </div>
          ))}
        </div>

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
            placeholder="Type your message..."
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
  );
};

export default Chatbot;
