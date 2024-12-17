import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import formatDate from '../Helper/formateDate'
import { useNavigate } from 'react-router-dom'
function Home() {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate()
    const fetchTourData=async()=>{
      try {
        const response= await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/tours/all_tours`,{withCredentials:true})
        console.log("Response tour",response)
        setData(response?.data?.data)
        setLoading(false)
      } catch (error) {
         console.error("error while fetching all projects",error)
      }
    }
    useEffect(()=>{
        fetchTourData()
    },[])

    const handleNaviage=(e,_id)=>{
      e?.preventDefault();
      e?.stopPropagation();
      navigate("/booking/"+_id) 
    } 

  return (
    <div className='w-full h-[100vh]'>
        <div className='grid justify-evenly items-center md:flex md:flex-wrap space-x-1 gap-4 p-4'>
            {
              loading ? (
                <div className="">
                   <p className="text-center bg-[#9933ff] p-2 text-white font-bold">Loadin,wait...</p>
                </div>
              ) : (
                <>
                 {
                  data.map((tour,index)=>(
                    <div className='w-full grid md:w-1/5 justify-center items-center gap-2 p-4 rounded-lg shadow-[#9933ff] shadow hover:scale-105 duration-700' key={index}>
                       <img src={tour?.image} alt={tour?.title} className='w-[400px] h-[200px] rounded'/>
                       <h1 className='text-slate-500 uppercase font-bold'>{tour?.title}</h1>
                       <h1 className='text-white font-bold'>₹ {tour?.price}</h1>
                      <div className="">
                        <p className={`text-lg"}`}>Available  <span className="text-blue-600">{formatDate(tour?.availableDate)}</span></p>
                        
                      </div>
                       <div className='w-full flex gap-2 items-center justify-between'>
                         <Link onClick={(e)=>handleNaviage(e,tour?._id)} className='w-full bg-[#9933ff] hover:scale-105 duration-300 text-white font-bold p-2 text-center rounded-md'>Book Now</Link>
                       </div>
                    </div>
                   ))
                 }
              </>
              )  
            }
        </div> 
    </div>
  )
}

export default Home