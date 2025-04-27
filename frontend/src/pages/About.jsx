import React, { useState, useEffect, useRef } from 'react';
import { FaShieldAlt, FaMapMarkedAlt, FaUsers, FaBell, FaRocket, FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaQuoteLeft, FaQuoteRight, FaCheckCircle, FaTwitter } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import profile_img from '../assets/profile_img.jpg';
import Arjun from '../assets/Arjun.jpg';
import Pratyusha from '../assets/Prathyusha.jpg';


const About = () => {
  const { darkMode } = useTheme();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const formRef = useRef();
  
  useEffect(() => {
    if (window.location.search.includes('message=success')) {
      const notification = document.createElement('div');
      notification.className = 'form-success-notification';
      notification.innerHTML = `
        <div class="notification-content">
          <span>✓</span>
          <p>Message sent successfully!</p>
        </div>
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 500);
      }, 5000);
      
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);
  
  const teamMembers = [
    {
      id: 1,
      name: "Samith S Palan",
      role: "Frontend Developer",
      image: profile_img,
      bio: "Frontend dev who can also do backend",
      linkedin: "https://x.com/samith17118",
      github: "https://github.com/samithspalan"
    },
    {
      id: 2,
      name: "Prathyusha Paranjape",
      role: "Frontend Developer",
      image: Pratyusha,
      bio: "Turning ideas into responsive UIs",
      linkedin: "https://linkedin.cohttps://www.linkedin.com/in/prathyusha-k-570251293",
      github: "https://github.com/Prathyusha-K-05"
    },
    {
      id: 3,
      name: "Arjun Shenoy",
      role: "Backend Developer",
      image: Arjun,
      bio: "Full-stack enthusiast bridging beautiful designs with powerful APIs",
      linkedin: "http://www.linkedin.com/in/arjun-shenoy-r-586546285",
      github: "https://github.com/Arjun13-git"
    }
  ];
  
  const testimonials = [
    {
      id: 1,
      name: "John D.",
      role: "Emergency Manager",
      text: "This platform has revolutionized how we coordinate our emergency response efforts. The real-time alerts and mapping features are invaluable."
    },
    {
      id: 2,
      name: "Lisa T.",
      role: "Community Leader",
      text: "As a community organizer, I've found this tool incredibly helpful for keeping residents informed during weather emergencies."
    },
    {
      id: 3,
      name: "Mark W.",
      role: "Disaster Relief Volunteer",
      text: "The mapping feature helped us coordinate relief efforts during the recent floods. It's user-friendly and provides crucial information."
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    setLoading(true);
    if (!formData.name || !formData.email || !formData.message) {
      e.preventDefault(); 
      setFormStatus({
        submitted: true,
        error: true,
        message: 'Please fill all fields'
      });
      setLoading(false);
      return;
    }
    setFormStatus({
      submitted: true,
      error: false,
      message: 'Sending your message...'
    });
  };

  return (
    <div className={`about-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="about-container">
        
        <div className="about-mission">
          <h2><FaShieldAlt className="about-icon" /> Our Mission</h2>
          <p>
            Our mission is to provide timely, accurate, and actionable information about disasters and emergencies
            to help people stay safe and respond effectively during critical situations.
          </p>
        </div>
        
        <div className="about-features">
          <h2><FaRocket className="about-icon" /> Core Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FaBell className="feature-icon" />
              <h3>Real-time Alerts</h3>
              <p>Receive instant notifications about emergencies and natural disasters in your area.</p>
            </div>
            
            <div className="feature-card">
              <FaMapMarkedAlt className="feature-icon" />
              <h3>Interactive Maps</h3>
              <p>Visualize disaster-prone areas, evacuation routes, and emergency facilities on detailed maps.</p>
            </div>
            
            <div className="feature-card">
              <FaUsers className="feature-icon" />
              <h3>Community Support</h3>
              <p>Connect with others in your community during emergencies and coordinate response efforts.</p>
            </div>
          </div>
        </div>
        
        <div className="about-contributors">
          <h2><FaUsers className="about-icon" /> Contributors</h2>
          <div className="contributors-grid">
            {teamMembers.map((member) => (
              <div className="contributor-card-container" key={member.id}>
                <div className="contributor-card">
                  <div className="contributor-card-front">
                    <img src={member.image} alt={member.name} className="contributor-image" />
                    <h3>{member.name}</h3>
                    <p className="contributor-role">{member.role}</p>
                  </div>
                  <div className="contributor-card-back">
                    <h3>{member.name}</h3>
                    <p className="contributor-bio">{member.bio}</p>
                    <div className="contributor-social">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaLinkedin />
                      </a>
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaGithub />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="about-testimonials">
          <h2><FaUsers className="about-icon" /> What People Say</h2>
          <div className="testimonials-container">
            <div className="testimonials-slider" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div className="testimonial-card" key={testimonial.id}>
                  <div className="testimonial-content">
                    <FaQuoteLeft className="quote-icon quote-left" />
                    <p className="testimonial-text">{testimonial.text}</p>
                    <FaQuoteRight className="quote-icon quote-right" />
                    <div className="testimonial-author">
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="testimonial-indicators">
              {testimonials.map((_, index) => (
                <button 
                  key={index} 
                  className={`testimonial-indicator ${index === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="about-contact">
          <h2><FaEnvelope className="about-icon" /> Contact Us</h2>
          <div className="contact-container">
            <div className="contact-info">
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <p><b>samith7755@gmailcom</b></p>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <p><b>+1 (555) 123-4567</b></p>
              </div>
            
            </div>
            
            <form 
              className="contact-form" 
              action="https://formsubmit.co/samith7755@gmail.com" 
              method="POST"
              onSubmit={handleSubmit}
              ref={formRef}
            >
              {formStatus.submitted && (
                <div className={`form-message ${formStatus.error ? 'error' : 'success'}`}>
                  {formStatus.error ? (
                    <p>{formStatus.message}</p>
                  ) : (
                    <p><FaCheckCircle /> {formStatus.message}</p>
                  )}
                </div>
              )}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  placeholder="Your Email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows="4" 
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              
              <input type="hidden" name="_subject" value="New contact from Disaster Alert App!" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_replyto" value={formData.email} />
              
              <input 
                type="hidden" 
                name="_next" 
                value={window.location.origin + window.location.pathname + "?message=success"} 
              />
              
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 