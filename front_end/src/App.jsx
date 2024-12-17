import Context from "../context";
import { BrowserRouter as Router,Routes,Route,Navigate } from "react-router-dom"
import Header from "./components/Header";
import { useEffect } from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AdminPanel from "./components/AdminPanel";
import { setUserDetails } from './store/userSlice';
import { useDispatch } from "react-redux";
import axios from "axios";
import AllTourPackageAdmin from "./components/AllTourPackageAdmin";
import Home from "./components/Home";
import Booking from "./components/Booking";
import SuccessBooking from "./components/SuccessBooking";
import AdminAllBookings from "./components/AdminAllBookings";
function App() {
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    
    try {
      const token = localStorage.getItem('AccessToken');
       console.log("Tokens",token)
       if(!token){
        console.log("token is not found local storage")
       }
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/profile`,
        { 
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      dispatch(setUserDetails(response.data.data));
      //console.log("response",response)
    } catch (error) {
      console.log("error while fetching user details", error?.message);
    }
  };
  useEffect(() => {
     fetchUserDetails();
  }, []);

  return (
   <Context.Provider value={{fetchUserDetails}}>
     <Router>
       <div className="pb-24">
          <Header/>
        </div>
       <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin_panel" element={<AdminPanel/>}>
              <Route index element={<Navigate to="allPackages"/>} />
              <Route path="allPackages" element={<AllTourPackageAdmin/>}/>
              <Route path="all_bookings" element={<AdminAllBookings/>} />
          </Route>
          <Route path="/booking/:_id" element={<Booking/>}/>
          <Route path="/comfirm_booking" element={<SuccessBooking/>}/>
       </Routes>
     </Router>
   </Context.Provider>
  )
}

export default App
