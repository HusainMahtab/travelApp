import React, { useState,useRef} from 'react'
import { IoCloudUpload } from 'react-icons/io5'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaRegWindowClose } from "react-icons/fa";
import axios from 'axios'

function AdminEditTourPackage({onClose,Data}) {
  const [uploadData,setuploadData]=useState({
    title:Data?.title,
    description:Data?.description,
    price:Data?.price,
    availableDate:Data?.availableDate,
    image:Data?.image

 })
 const navigate=useNavigate()
 const handleChange=(e)=>{
   const {name,value}=e.target
   setuploadData((prev)=>{
     return{
       ...prev,
       [name]:value
     }
   })
   console.log("fromdata",value)
 }
 const fileInputRef = useRef(null);

const handleUploadImage = (e) => {
 const file = e.target.files[0];
 if (file) {
   if (file.type.startsWith('image/')) {
     const reader = new FileReader();
     reader.onloadend = () => {
       setuploadData((prev) => ({
         ...prev,
         image:reader.result, // Set profile pic preview
       }));
     };
     reader.readAsDataURL(file);
   } else {
     toast.error('Please upload a valid image file');
   }
 }
};

const handleSubmit = async (e) => {
   e.preventDefault();
   const formData = new FormData();
   formData.append('title', uploadData.title);
   formData.append('description', uploadData.description);
   formData.append('price', uploadData.price);
   formData.append('availableDate',uploadData.availableDate);
   // Use the ref to get the file
   if (fileInputRef.current.files[0]) {
     formData.append('image', fileInputRef.current.files[0]); // Append the actual file
   }

   try {
     const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/tours/update_tour_package/${Data?._id}`,formData,{
       headers: {
         'Content-Type': 'multipart/form-data',
       },
       withCredentials:true
     },);
     toast.success("Edit successfully");
     setTimeout(() => {
       navigate("/");
     },1000);
   } catch (error) {
     console.error('error while editing Tour package', error);
     toast.error("Not Edit");
   }
 };

  return (
    <div>
        
    <div className='fixed w-full top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-200 bg-opacity-80 z-50'>
     <form action="submit" onSubmit={handleSubmit} className='w-[400px] h-[550px] bg-[#9933ff] rounded p-6 overflow-y-scroll'>
     <div className='flex justify-between items-center'>
         <h1 className='text-lg font-bold'>Edit Tour Package</h1>
         <FaRegWindowClose className='text-2xl cursor-pointer text-red-600 hover:text-red-500' onClick={onClose}/>
     </div>
       <div className='grid gap-2 p-2'>
         <label htmlFor="title">Title:</label>
         <input type="text" id='title' name="title" value={uploadData.title} onChange={handleChange} placeholder='Enter tour title' className='p-2 bg-slate-200 text-black font-semibold text-lg'/>
       </div>
       <div className='grid gap-2 p-2'>
         <label htmlFor="description">Descriptions:</label>
         <textarea name="description" id="description" placeholder='Enter project Descriptions' value={uploadData.description} onChange={handleChange} className='p-2 text-black  bg-slate-200 font-semibold text-lg'>Descriptions</textarea>
       </div>
       <div className='grid gap-2 p-2'>
         <label htmlFor="price">Price:</label>
         <input type="number" id='price' name="price" value={uploadData.price} onChange={handleChange} placeholder='Enter tour price' className='p-2 text-black  bg-slate-200 font-semibold text-lg'/>
       </div>
       <div className='grid gap-2 p-2'>
         <label htmlFor="availableDate">AvailableDate:</label>
         <input type="date" id='availableDate' name="availableDate" value={uploadData.availableDate} onChange={handleChange} placeholder='Enter tour price' className='p-2 text-black  bg-slate-200 font-semibold text-lg'/>
       </div>
     <div className="w-full h-[250px] p-2 mx-auto overflow-hidden m-2">
       <label htmlFor="">Package Image:</label>
        <div className='text-center'>
         <img src={uploadData?.image} alt="upload-image" className='w-[450px] h-[180px] p-2' />
        </div>
        <form>
         <label>
          <div className="bg-opacity-80 w-full flex justify-evenly bg-gray-300 py-2 pt-2 cursor-pointer text-center">
           <IoCloudUpload className="w-full text-center text-3xl" />
          </div>
          <input type="file" className="hidden" onChange={handleUploadImage} ref={fileInputRef} />
         </label>
        </form>
       </div>
       <button className='w-full rounded mt-5 p-2 border-2 border-white text-white font-bold hover:bg-[#9933ff] text-lg hover:text-white'>Edit</button>
    </form>
   </div>
  </div>
  )
}

export default AdminEditTourPackage