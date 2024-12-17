import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import Context from '../../context';
import axios from 'axios';
function Login() {
 const initialData={
   email:"",
   password:""
 }
 const {fetchUserDetails}=useContext(Context)
 const navigate=useNavigate()
 const [data,setData]=useState(initialData)
 const [loader,setLoader]=useState(false)
 const handleChange=(e)=>{
    const {name,value}=e.target
    setData((prev)=>{
      return {
        ...prev,
        [name]:value
      }
    })
 }

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoader(true)
   try {
   const login_data = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/login`,data,{
     withCredentials: true, // Ensure cookies are sent with the request
   });
   setLoader(false)
   console.log("logindata",login_data)
    toast.success(`${login_data?.data?.data?.user?.role} login sucessfully`);
    fetchUserDetails();
    setTimeout(()=>{
       navigate("/"); // Navigate to the home page
    },1000)
   
    } catch (error) {
     toast.error("not login, somthing is wrong!");
     console.log("error while logging in user", error);
    setLoader(false)
}
};

  return (
    <div className='w-full h-[80vh] flex justify-center items-center p-4'>
       <form className="border border-[#9933ff] p-8" onSubmit={handleSubmit}>
           <h1 className="w-full text-center text-[#9933ff] font-bold">Login</h1>
           <div className='p-4'>
           <div className='grid'>
              <label htmlFor="email">Email:</label>
              <input type="text" id='email' name='email' value={data.email} required onChange={handleChange} autoFocus placeholder='Enter Email' className=' text-[#1a1a1a] p-2'/>
           </div>
           <div className='grid'>
              <label htmlFor="password">Password:</label>
              <input type="password" id='password' name='password' value={data.password} placeholder='Enter Password' required onChange={handleChange} className='text-[#1a1a1a] p-2'/>
           </div>
           </div>
             {
              loader ? (
                 <div className='w-full bg-[#9933ff] flex justify-center items-center rounded p-2'>
                   <div className='w-[10px] p-2 text-white  border-4 border-b-[#9933ff] rounded-full animate-spin'></div>
                </div>
              ) : (
                  <div className='w-full flex justify-center items-center'>
                    <button className='w-[200px] md:w-[200px] p-2 bg-[#9933ff] font-bold text-white rounded hover:scale-110 duration-300' >Login</button>
                  </div>
              )
             }
           <Toaster/>
           <div className="flex justify-center items-center gap-2 mt-3">
              <p>Don't have Account:</p>
              <p onClick={()=>navigate("/signup")} className='text-[#9933ff] cursor-pointer underline md:no-underline hover:underline'>SignUp</p>
           </div>
       </form>
    </div>
  )
}

export default Login