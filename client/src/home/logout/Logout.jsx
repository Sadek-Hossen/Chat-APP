import axios from "axios";
import React, { useState } from "react";
import { CiLogout } from "react-icons/ci";
import Coockie from "js-cookie";
import toast from "react-hot-toast";
function Logout() {
  const [loading, setLoading] = useState(false);
  const handleLogut = async()=>{
    setLoading(true);
    try {
       const res = await axios.post(`/api/user/logout`);
       localStorage.removeItem("messenger"); // Clear user data from localStorage
       Coockie.remove("jwt")
       toast.success('Logout successful!');
       window.location.reload(); // Reload the page to reflect logout state
       setLoading(false);
    } catch (error) {
        console.error("Logout error:", error);
        
    } 

  }
  return (
    <div className="bg-gray-800 max-h-screen flex justify-end flex-col  w-[6%] p-4 text-white">
      <div onClick={handleLogut} className="p-3 bg-gray-700 cursor-pointer hover:bg-gray-600 duration-200 text-white text-xl font-bold rounded-lg hover:border border-white">
        <CiLogout />
      </div>
    </div>
  );
}

export default Logout;
