import React, { useContext } from 'react';
import { data } from '../context/Usercontext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function SignupPage() {
    let {serverUrl,userdata,setuserdata,getuserdata}=useContext(data)
    let navigate=useNavigate()
    let [Username, setUsername] = React.useState('')
    let [Email, setEmail] = React.useState('')
    let [Password, setPassword] = React.useState('')

    const handleSignUp=async(e)=>{  
      e.preventDefault()
      try{
        let data1=await axios.post(serverUrl+"/signup",{
            Username:Username,
            email:Email,
            password:Password
        },{withCredentials:true
        })
        await getuserdata()
        setuserdata(data1.data.user)
        if(data1.data){
        navigate("/")
        }
        console.log(data1)
      }catch(err){
        console.log(err)
        alert(err.response?.data?.message || "Signup failed")
      } 
    }
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={Email}
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
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <div className="login-text">
          Already have an account? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
