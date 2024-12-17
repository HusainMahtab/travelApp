import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import formatDate from '../Helper/formateDate';
function Booking() {
  const [ProductData,setProductData]=useState({
    _id:"",  
     title:"",
     description:"",
     price:"",
     availableDate:"",
     image:"",
   })

   console.log("id",ProductData._id)
 
   const [orderData,setOrderData]=useState({
     package:[{
       packageId:"",
       packageTitle:"",
       image:"",
     }],
     name:"",
     email:"",
     phoneNumber:"",
     numberOftravelers:1,
     specialRequests:""
   })
   const [loading,setLoading]=useState(true)
   const params=useParams()
   const navigate=useNavigate()
   const fetchedProductDetails=async()=>{
     try {
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/tours/tour_details`,params,{withCredentials:true})
         console.log("package details",response)
         setProductData(response?.data?.data)
        //console.log("Data",data)
        setLoading(false)
     } catch (error) {
         console.error("error while post product details")
     }
   }
   useEffect(()=>{
     fetchedProductDetails()
   },[params])
   
   //console.log("Image",formData?.productImage[0])
   
   const handleChange=(e)=>{
      const {name,value}=e.target
      setOrderData((prev)=>{
        return{
         ...prev,
         [name]:value
        } 
      })
      //console.log(value)
   }
 
   const handleSubmit=async(e)=>{
      e.preventDefault()
      //console.log("orderData",updatedOrderData)
      try {
       const orderResponse=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/bookings/booking`,orderData,{withCredentials:true})
       toast.success("Payment sucessfull")
       //console.log("orderResponse",orderResponse)
       navigate("/confirm_order")
     } catch (error) {
       console.error("error while creating a order",error)
       toast.error("Payment Error")
     }
   }
 
   useEffect(() => {
    // Update orderData when ProductData is set
    if (ProductData._id) {
      setOrderData((prevOrderData) => ({
        ...prevOrderData,
        package: [{
          packageId: ProductData._id,
          packageTitle: ProductData.title,
          image: ProductData.image,
        }]
      }));
    }
  }, [ProductData]);
  return (
    <div className='w-full h-100vh flex justify-center '>
    {
     loading ? ( 
      <div className='w-full p-4 flex justify-center'>
        <h1 className='text-white bg-[#9933ff] p-2'>Loading,wait...</h1>
      </div>
     ) : (
     <div className='border border-[#9933ff] w-[400px] h-auto p-2 m-2'>
     <div className='w-full grid justify-center place-content-center p-3 gap-4'>
      <div className='flex gap-6 p-4 bg-[#8876]'>
        <div className='p-2 bg-slate-200 flex justify-center rounded items-center'>
          <img src={ProductData?.image} alt={ProductData?.title} className='w-[350px] h-[150px] md:w-[200px] md:h-[200px] mix-blend-multiply' />
        </div>
        <div className='grid'>
          <div className='w-full h-8 flex justify-center items-center bg-slate-200 rounded-full'>
            <p className='text-[#9933ff] font-bold'>{ProductData?.title}</p>
          </div>
           <p>₹ {ProductData?.price}</p>
           <div>
            <p>Available Date</p>
            <span className='text-blue-600'>{formatDate(ProductData?.availableDate)}</span>
           </div>
        </div>
      </div>
      <div className="">
      <form action="submit" className='grid gap-2 mb-4' onSubmit={handleSubmit}>
         <div className='grid'>
            <label htmlFor="customer">CustomerName:</label>
            <input type="text" id="customer" autoFocus name='name' value={orderData.name} placeholder='Enter your name' onChange={handleChange} className='p-2 text-lg font-semibold text-black bg-slate-200' required />
         </div>
         <div className='grid'>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name='email' value={orderData.email} placeholder='Enter your phone' onChange={handleChange} className='p-2 text-lg font-semibold text-black bg-slate-200'required />
         </div>
         <div className='grid'>
            <label htmlFor="phoneNumber">PhoneNumber:</label>
            <input type="number" id="phoneNumber" name='phoneNumber' value={orderData.phoneNumber} placeholder='Enter your phone' onChange={handleChange} className='p-2 text-lg text-black font-semibold bg-slate-200'required />
         </div>
         <div className='grid'>
            <label htmlFor="numberOftravelers">Number of Travelers:</label>
            <input type="number" id="numberOftravelers" name='numberOftravelers' value={orderData.numberOftravelers} placeholder='Enter your phone' onChange={handleChange} className='p-2 text-lg text-black font-semibold bg-slate-200'required />
         </div>
         <div className='grid'>
            <label htmlFor="specialRequests">Spacial Requests:</label>
            <textarea name="specialRequests" id="specialRequests" value={orderData.specialRequests} onChange={handleChange} placeholder='Enter your address' className='p-2 text-lg font-semibold text-black bg-slate-200' required></textarea>
         </div>
         <div className='grid'>
            <label htmlFor="price">Total Amount:</label>
            <p className='text-xl font-mono font-bold'>₹ {ProductData?.price*orderData?.numberOftravelers}</p>
         </div>
         <button onClick={()=>navigate("/comfirm_booking")} className='w-full p-2 text-lg bg-purple-700 text-white font-bold rounded hover:bg-purple-600'>₹ {((ProductData?.price)*orderData?.numberOftravelers)} Pay</button>
      </form>
      </div>
     </div>
     </div>
     )
    }
  </div>
  )
}

export default Booking