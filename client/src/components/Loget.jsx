import React from "react";
import { Link } from "react-router-dom";

function Logged() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg w-[90%] max-w-md text-center">
        
        <h1 className="text-3xl font-bold mb-4 text-red-400">
          You are logged now
        </h1>

        <p className="text-gray-300 mb-6">
        You can go you home page and start chatting with your friends. Enjoy the experience!
        </p>
     
        <Link
          to="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 transition px-6 py-2 rounded-lg font-semibold"
        >
         Go Home
        </Link>
       
      </div>
    </div>
  );
}

export default Logged;
