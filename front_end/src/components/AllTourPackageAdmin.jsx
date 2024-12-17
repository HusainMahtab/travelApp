import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UploadTourPackage from './UploadTourPackage'
import AdminPackageCart from './AdminPackageCart'
function AllTourPackageAdmin() {
  const [openUploadProduct,setOnenUploadProduct]=useState(false)
  const [allTours,setAllTours]=useState([])
  const [loading,setLoading]=useState(true)

  const getAllTourPackage=async()=>{
    const response= await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/tours/all_tours`)
    setAllTours(response.data.data)
    setLoading(false)
    console.log("all Tours response",response)
  }

  useEffect(()=>{
    getAllTourPackage()
  },[])
  return (
    <div>
    <div className="bg-white py-2 px-4 flex justify-between items-center">
      <h2 className='font-bold text-lg text-[#9933ff]'> All Tour Packages </h2>
      <button className='border-2 border-[#9933ff] text-[#9933ff] py-0.5 px-2 rounded-full hover:bg-[#9933ff] hover:text-white transition-all' onClick={()=>setOnenUploadProduct(true)}>Upload New Tour</button>
    </div> 
      <div>
       {
        loading ? (<div className="text-[#9933ff]">Loading...</div>) : (
          <div className='flex justify-center gap-3 py-2 flex-wrap'>
            {
              allTours.map((tour,index)=>(
              <AdminPackageCart 
              key={index+1} 
              tourData={tour}
              fetchAllTours={getAllTourPackage}
             />
             ))
            }
          </div>
        )
       }
       </div> 
    {/* upload product component */}
    {
      openUploadProduct &&(
        <UploadTourPackage onClose={()=>setOnenUploadProduct(false)}/>
      )
    }
     
  </div>
  )
}

export default AllTourPackageAdmin