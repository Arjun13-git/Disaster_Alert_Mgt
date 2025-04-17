import React, { useState, useEffect, useContext } from 'react';
import { FaBell, FaShieldAlt, FaInfoCircle, FaClipboardList, FaMedkit, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { data } from '../context/Usercontext';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';

const Home = () => {
  const { darkMode } = useTheme();
  const { userdata } = useContext(data);
  const [activeAlert, setActiveAlert] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    {
      src: image1,
      caption: 'First responders in action during emergency response'
    },
    {
      src: image2,
      caption: 'Community evacuation during flooding'
    },
    {
      src: image3,
      caption: 'Volunteer teams providing disaster relief'
    },
    {
      src: image4,
      caption: 'Emergency shelter setup during disasters'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  useEffect(() => {
    setTimeout(() => {
      setWeatherData({
        temperature: 28,
        condition: 'Sunny',
        humidity: 65,
        wind: '12 km/h'
      });
      setLoading(false);
    }, 1000);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselImages.length) % carouselImages.length);
  };

  const alerts = [
    {
      id: 1,
      type: 'Flood Warning',
      location: 'Central District',
      severity: 'High',
      description: 'Heavy rainfall expected. Possible flooding in low-lying areas.',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'Wildfire Alert',
      location: 'Northern Region',
      severity: 'Medium',
      description: 'Wildfire reported. Keep away from affected areas.',
      time: '5 hours ago'
    }
  ];

  const safetyTips = [
    { id: 1, icon: <FaShieldAlt />, tip: 'Create an emergency preparedness kit' },
    { id: 2, icon: <FaClipboardList />, tip: 'Have an evacuation plan ready' },
    { id: 3, icon: <FaMedkit />, tip: 'Keep a first aid kit accessible' },
    { id: 4, icon: <FaInfoCircle />, tip: 'Stay informed about local emergency alerts' }
  ];

  const handleAlertClick = (alert) => {
    setActiveAlert(alert);
  };

  const closeAlertDetails = () => {
    setActiveAlert(null);
  };

  return (
    <div className={`home-container ${darkMode ? 'dark-mode' : ''}`}>
   
     

      <section className="carousel-section">
        <div className="carousel-container">
          <button className="carousel-button prev" onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          
          <div className="carousel-content">
            {carouselImages.map((image, index) => (
              <div 
                key={index} 
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
              >
                <img src={image.src} alt={`Disaster management ${index + 1}`} />
                <div className="carousel-caption">
                  <p>{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="carousel-button next" onClick={nextSlide}>
            <FaChevronRight />
          </button>
          
          <div className="carousel-indicators">
            {carouselImages.map((_, index) => (
              <button 
                key={index} 
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="welcome-section">
        <h1>Welcome to Disaster Alert System</h1>
        <p className="welcome-message">
          {userdata ? `Hello, ${userdata.Username || 'User'}!` : 'Stay safe and informed during emergencies'}
        </p>
      </section>
      <section className="weather-card">
        <h2>Current Weather</h2>
        {loading ? (
          <p>Loading weather data...</p>
        ) : (
          <div className="weather-info">
            <div className="weather-main">
              <span className="temperature">{weatherData.temperature}°C</span>
              <span className="condition">{weatherData.condition}</span>
            </div>
            <div className="weather-details">
              <p>Humidity: {weatherData.humidity}%</p>
              <p>Wind: {weatherData.wind}</p>
            </div>
          </div>
        )}
      </section>

    
      <section className="alerts-section">
        <h2><FaBell /> Active Alerts</h2>
        <div className="alerts-container">
          {alerts.length > 0 ? (
            alerts.map(alert => (
              <div 
                key={alert.id} 
                className={`alert-card severity-${alert.severity.toLowerCase()}`}
                onClick={() => handleAlertClick(alert)}
              >
                <h3>{alert.type}</h3>
                <p><strong>Location:</strong> {alert.location}</p>
                <p><strong>Severity:</strong> {alert.severity}</p>
                <p className="alert-time">{alert.time}</p>
              </div>
            ))
          ) : (
            <p className="no-alerts">No active alerts at this time.</p>
          )}
        </div>
      </section>

     
      <section className="safety-tips">
        <h2>Safety Tips</h2>
        <div className="tips-container">
          {safetyTips.map(tip => (
            <div key={tip.id} className="tip-card">
              <div className="tip-icon">{tip.icon}</div>
              <p>{tip.tip}</p>
            </div>
          ))}
        </div>
      </section>

     
      {activeAlert && (
        <div className="modal-overlay" onClick={closeAlertDetails}>
          <div className={`modal-content alert-modal ${darkMode ? 'dark-mode' : ''}`} onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">{activeAlert.type}</h2>
            <div className="alert-details">
              <p><strong>Location:</strong> {activeAlert.location}</p>
              <p><strong>Severity:</strong> {activeAlert.severity}</p>
              <p><strong>Description:</strong> {activeAlert.description}</p>
              <p><strong>Reported:</strong> {activeAlert.time}</p>
              <div className="alert-actions">
                <ul>
                  <li>Follow evacuation instructions if issued</li>
                  <li>Stay tuned to local news for updates</li>
                  <li>Keep emergency contacts accessible</li>
                </ul>
              </div>
            </div>
            <button className="close-button" onClick={closeAlertDetails}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;