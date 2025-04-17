// src/pages/LoginPage.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { data } from '../context/Usercontext'
import axios from 'axios'

const LoginPage = () => {
  let {serverUrl,userdata,setuserdata,getuserdata}=useContext(data)
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const handleLogin=async(e)=>{  
    e.preventDefault()
    try{
      let data1=await axios.post(serverUrl+"/login",{
          email:Email,
          password:Password
      },{withCredentials:true})
         await getuserdata()
              setuserdata(data1.data.user)
             if(data1.data){
                    navigate("/")
                    }
      console.log(data1)
    }catch(err){
      console.log(err)
      alert(err.response.data.message)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="signup-text">
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
