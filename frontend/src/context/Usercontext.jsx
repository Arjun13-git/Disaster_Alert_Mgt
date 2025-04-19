import React, { createContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const data=createContext()
function Usercontext({children}) {
  let navigate=useNavigate()
  let[userdata,setuserdata]=React.useState(null)
    const serverUrl="http://localhost:8000"
    const getuserdata=async()=>{  
      try{
        let data1=await axios.get(serverUrl+"/getuserdata",{withCredentials:true})
        setuserdata(data1.data.user)
      }catch(err){
        console.log(err)
        if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
          navigate("/login")
        }
      }
    }
    const value={
        serverUrl,userdata,setuserdata,getuserdata
    }
  
  useEffect(()=>{
    if (!userdata) {
      getuserdata()
    }
  },[])
  
  return (
    <data.Provider value={value}>
        {children}
    </data.Provider>
  )
}

export default Usercontext