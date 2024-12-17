import React, { useState } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import AdminEditTourPackage from './AdminEditTourPackage';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmModal from './ConfirmModal';

function AdminPackageCart({ tourData, fetchAllTours }) {
    const [editTour, setEditTour] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); 
  
    const handleDeleteTour = async () => {
      const tourId = tourData._id;
      //console.log("productid", productId);
  
      try {
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/tours/delete_tour_package/${tourId}`, { withCredentials: true });
        toast.success(response.data.message);
        fetchAllTours();
      } catch (error) {
        console.log("error while deleting tour package", error);
        toast.error("error while deleting tour package");
      }
      setIsModalOpen(false); 
    };
  
  return (
    <div className='bg-[#9933ff] rounde p-4 shadow-lg rounded-md'>
    <div className="w-40">
       <div className="w-32 h-32 flex justify-center items-center">
         <img src={tourData.image} alt="product" className='mx-auto object-fill h-full'/>
       </div>
      <h2>{tourData.title}</h2>
      <h1 className="font-bold text-xs">₹{(tourData.price)}</h1>
      <div className="flex gap-2">
        <div className="w-fit ml-auto p-1 bg-green-400 rounded-full cursor-pointer hover:bg-green-600 hover:text-white" onClick={() =>setEditTour(true)}>
          <CiEdit />
        </div>
        <div className="p-1 bg-red-400 rounded-full cursor-pointer hover:bg-red-600 hover:text-white" onClick={() => setIsModalOpen(true)}>
          <MdDeleteOutline/>
        </div>
        <Toaster/>
      </div>
    </div>
    {editTour && (
      <AdminEditTourPackage onClose={() => setEditTour(false)} Data={tourData} fetchAllTours={fetchAllTours} />
    )}

    {/* Render the modal */}
    {isModalOpen && <ConfirmModal
      onClose={() => setIsModalOpen(false)}
      onConfirm={handleDeleteTour}
    />
    }
  </div>
  )
}

export default AdminPackageCart