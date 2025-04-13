import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Home from './pages/Home';
import Location from './pages/Location';
import Profile from './pages/Profile';
import SOS from './pages/SOS';
import './App.css'

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/location" element={<Location/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/sos" element={<SOS/>} />
      </Routes>
    </Router>  )
}

export default App
