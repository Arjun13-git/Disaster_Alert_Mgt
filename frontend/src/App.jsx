import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Location from './pages/Location';
import Profile from './pages/Profile';
import SOS from './pages/SOS';
import './App.css';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import { ThemeProvider } from './context/ThemeContext';

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />


          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/location" element={<Layout><Location /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/sos" element={<Layout><SOS /></Layout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App
