import React, { useState, useRef } from 'react';
import { IoCloudUpload } from 'react-icons/io5';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const initialData = {
    userName: '',
    email: '',
    password: '',
    role: 'USER',
    phoneNumber: '',
    profilePic: '',
  };

  const navigate = useNavigate();
  const [data, setData] = useState(initialData);
  const [loader,setLoader]=useState(false)
  // Create a ref for the file input
  const fileInputRef = useRef(null);

  const handleUploadPic = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setData((prev) => ({
            ...prev,
            profilePic: reader.result, // Set profile pic preview
          }));
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Please upload a valid image file');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userName', data.userName);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('role', data.role);
    formData.append('phoneNumber', data.phoneNumber);

    // Use the ref to get the file
    if (fileInputRef.current.files[0]) {
      formData.append('profilePic', fileInputRef.current.files[0]); // Append the actual file
    }
    setLoader(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoader(false)
      toast.success(response.data?.message);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error('User not signed up', error);
      toast.error("signUp Error, somthing is worng!");
      setLoader(false)
    }
  };

  return (
    <section className="w-full h-[80vh] grid justify-center items-center p-4">
      <div className="w-[320px] h-[550px] md:w-[400px] md:h-[550px] border mt-10 border-[#9933ff] p-4">
       <div className="w-20 h-20 border border-[#9933ff] rounded-full mx-auto overflow-hidden">
        <div className='w-full text-center'>
          <img src={data.profilePic} alt="upload-image" />
        </div>
        <form>
          <label>
            <div className="bg-opacity-80 bg-gray-300 py-2 pt-2 cursor-pointer text-center">
              <IoCloudUpload className="w-full text-center" />
            </div>
            <input type="file" className="hidden" onChange={handleUploadPic} ref={fileInputRef} />
          </label>
        </form>
      </div>
      <form className="p-4" onSubmit={handleSubmit}>
        <h1 className="text-lg font-bold w-full text-center text-[#9933ff]">SignUp</h1>
        <div className="p-4">
          <div className="grid">
            <label htmlFor="userName">UserName:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={data.userName}
              required
              onChange={handleChange}
              autoFocus
              placeholder="Enter User name"
              className="p-2 text-[#1a1a1a] bg-slate-200"
            />
          </div>
          <div className="grid">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              placeholder="Enter Email"
              required
              onChange={handleChange}
              className="p-2 text-[#1a1a1a] bg-slate-200"
            />
          </div>
          <div className="grid">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              required
              placeholder="Enter Password"
              onChange={handleChange}
              className="p-2 text-[#1a1a1a] bg-slate-200"
            />
          </div>
          <div className="grid">
            <label htmlFor="phoneNumber">Phone:</label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={data.phoneNumber}
              placeholder="Enter Phone Number"
              required
              onChange={handleChange}
              className="p-2 text-[#1a1a1a] bg-slate-200"
            />
          </div>
        </div>
        <div className="">
           {
              loader ? (
                 <div className='w-full bg-[#9933ff] flex justify-center items-center rounded p-2'>
                   <div className='w-[10px] p-2 text-white  border-4 border-b-[#9933ff] rounded-full animate-spin'></div>
                </div>
              ) : (
                   <div className="w-full flex justify-center items-center">
                     <button className='w-[200px] md:w-[300px] p-2 bg-[#9933ff] font-bold text-white rounded hover:scale-110 duration-300' >SignUp</button> 
                   </div>
              )
             }
          <Toaster />
        </div>
      </form>
       <div className='flex justify-center items-center gap-2'>
         <p>Already have Account:</p>
         <p onClick={()=>navigate("/login")} className='hover:underline cursor-pointer text-lg text-[#9933ff]'>Login</p>
       </div>
     </div>
    </section>
  );
}

export default SignUp;