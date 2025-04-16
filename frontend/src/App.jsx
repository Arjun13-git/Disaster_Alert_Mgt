import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Home from './pages/Home';
import Location from './pages/Location';
import Profile from './pages/Profile';
import SOS from './pages/SOS';
import './App.css'
import LoginPage from './pages/login';
import SignupPage from './pages/signup';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/location" element={<Location/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/sos" element={<SOS/>} />
      </Routes>
    </Router>  )
}

export default App
