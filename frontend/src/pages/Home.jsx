import React, { useState, useEffect, useContext, useRef } from 'react';
import { FaBell, FaShieldAlt, FaInfoCircle, FaClipboardList, FaMedkit, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaMobileAlt, FaHeartbeat, FaHandHoldingHeart, FaHandsHelping, FaExclamationTriangle } from 'react-icons/fa';
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
  
  
  const welcomeRef = useRef(null);
  const weatherRef = useRef(null);
  const alertsRef = useRef(null);
  const tipsRef = useRef(null);
  const statsRef = useRef(null);
  const resourcesRef = useRef(null);
  const emergencyContactsRef = useRef(null);
  
  const useOnScreen = (ref) => {
    const [isIntersecting, setIntersecting] = useState(false);
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting),
        { threshold: 0.1 }
      );
      
      if (ref.current) {
        observer.observe(ref.current);
      }
      
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [ref]);
    
    return isIntersecting;
  };
  
  const welcomeVisible = useOnScreen(welcomeRef);
  const weatherVisible = useOnScreen(weatherRef);
  const alertsVisible = useOnScreen(alertsRef);
  const tipsVisible = useOnScreen(tipsRef);
  const statsVisible = useOnScreen(statsRef);
  const resourcesVisible = useOnScreen(resourcesRef);
  const emergencyContactsVisible = useOnScreen(emergencyContactsRef);
  
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
  
  const disasterStats = [
    { label: 'Disasters Reported', value: '127', icon: <FaExclamationTriangle /> },
    { label: 'People Rescued', value: '1,423', icon: <FaHeartbeat /> },
    { label: 'Relief Camps', value: '32', icon: <FaHandHoldingHeart /> },
    { label: 'Volunteers', value: '845', icon: <FaHandsHelping /> }
  ];
  
  const emergencyContacts = [
    { service: 'Emergency Helpline', number: '999', icon: <FaMobileAlt /> },
    { service: 'Flood Control', number: '1800-222-555', icon: <FaMapMarkerAlt /> },
    { service: 'Fire Services', number: '1800-101-101', icon: <FaExclamationTriangle /> },
    { service: 'Medical Emergency', number: '1800-103-104', icon: <FaMedkit /> }
  ];
  
  const resources = [
    { title: 'Disaster Preparedness Guide', description: 'Comprehensive guide to prepare for natural disasters' },
    { title: 'Emergency Contact Directory', description: 'Find all emergency contacts in your area' },
    { title: 'First Aid Training', description: 'Free online training for basic first aid skills' },
    { title: 'Community Support Network', description: 'Connect with local support groups and resources' }
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
      
      <section 
        ref={welcomeRef} 
        className={`welcome-section animate-section ${welcomeVisible ? 'visible' : ''}`}
      >
        <h1>Welcome to Disaster Alert System</h1>
        <p className="welcome-message">
          {userdata ? `Hello, ${userdata.Username || 'User'}!` : 'Stay safe and informed during emergencies'}
        </p>
      </section>
     
      <section 
        ref={weatherRef}
        className={`weather-card animate-section ${weatherVisible ? 'visible' : ''}`}
      >
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

      <section 
        ref={alertsRef}
        className={`alerts-section animate-section ${alertsVisible ? 'visible' : ''}`}
      >
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

      <section 
        ref={tipsRef}
        className={`safety-tips animate-section ${tipsVisible ? 'visible' : ''}`}
      >
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
      
      <section 
        ref={statsRef}
        className={`stats-section animate-section ${statsVisible ? 'visible' : ''}`}
      >
        <h2>Disaster Response Statistics</h2>
        <div className="stats-container">
          {disasterStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
      
      <section 
        ref={resourcesRef}
        className={`resources-section animate-section ${resourcesVisible ? 'visible' : ''}`}
      >
        <h2>Disaster Management Resources</h2>
        <div className="resources-container">
          {resources.map((resource, index) => (
            <div key={index} className="resource-card">
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <button className="resource-button">Access Resource</button>
            </div>
          ))}
        </div>
      </section>
      
      <section 
        ref={emergencyContactsRef}
        className={`emergency-contacts-section animate-section ${emergencyContactsVisible ? 'visible' : ''}`}
      >
        <h2>Emergency Contacts</h2>
        <div className="contacts-container">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="contact-card">
              <div className="contact-icon">{contact.icon}</div>
              <div className="contact-details">
                <h3>{contact.service}</h3>
                <p className="contact-number">{contact.number}</p>
              </div>
              <button className="call-now-button">Call</button>
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