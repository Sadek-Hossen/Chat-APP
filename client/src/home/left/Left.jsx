import React from "react";
import Search from "./Search";
import Users from "./Users";

function Left() {
  return (
    <div className="bg-gray-700  h-screen w-[30%] p-4 text-white ">
      <div className="">
        <h1 className="text-xl font-semibold text-gray-300 font-mono   ">
          Chat
        </h1>
      </div>

      <Search />
      <Users />
    </div>
  );
}

export default Left;
