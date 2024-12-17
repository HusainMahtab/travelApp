
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
function AdminPanel(){

    const user=useSelector(state=>state?.user?.user)
    const navigate=useNavigate()
    const location = useLocation();

    useEffect(() => {
      // Check if the user is not an admin and navigate them to home
      if (user?.role !== 'ADMIN') {
        navigate('/');
      }
      
      // Auto-select the "All Projects" route if on adminpanel root route
      if (location.pathname === '/adminpanel') {
        navigate('/adminpanel/allpackages');
      }
    }, [user, location, navigate]);
    
    return(
        <div className='h-96 my-16 sm:flex hidden w-full'>
        <aside className='min-h-full w-full max-w-60 shadow-lg'>
          <div className='h-28 flex justify-center items-center flex-col'>
            <div
               className='relative text-5xl text-gray-500 cursor-pointer justify-center flex mt-8'
               onClick={()=>setShowMenu(pre=>!pre)}
             >
               {
                 user?.profilePic ? (
                 <img className="rounded-full w-16 h-16" src={user?.profilePic} alt={user?.name}/>
                ):(<FaUserCircle className='hover:text-gray-600' />)
               }
            </div>
            <p className='capitalize text-lg front font-semibol '>{user?.userName}</p>
            <p className='text-sm text-slate-500'>{user?.role}</p>
            {/* <p>{user?.email}</p> */}
          </div>

          {/* navigation */}
          <div>
             <nav className='flex flex-col justify-center p-4 '>
                <Link to="allPackages" className='py-1 hover:bg-slate-100 hover:text-[#1a1a1a] px-2 rounded-md font-serif' >All Tour Package</Link>
                <Link to="all_bookings" className='py-1 hover:bg-slate-100 hover:text-[#1a1a1a] px-2 rounded-md font-serif' >All Bookings</Link>
                
             </nav>
          </div>
        </aside>
        <main className='bg-slate-100 w-full h-full p-2 overflow-scroll overflow-x-hidden mr-2'>
              <Outlet/>
        </main> 
    </div>
    )
}

export default AdminPanel