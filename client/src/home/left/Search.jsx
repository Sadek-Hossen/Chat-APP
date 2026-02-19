import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import UseGetAllUser from "../../context/useGetAllUser.jsx";
import useConversation from "../../stateManage/UseConversation.js";
import toast from "react-hot-toast";

function Search() {
  const [query, setQuery] = useState("");
  const [allUser] = UseGetAllUser();
  const {setSelectedConversation} = useConversation()

const handleSubmit = (e) => {
  e.preventDefault();

  if (!query.trim()) return;

  const conversation = allUser.find((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  if (conversation) {
    setSelectedConversation(conversation);
    setQuery("");
  } else {
    toast.error("User not found");
  }
};


  return (
    <div className="">
      <div className="w-full  max-w-md mx-auto ">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm"
        >
          {/* Search Icon */}
          <IoSearchOutline className="text-gray-500 text-xl" />

          {/* Input */}
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full outline-none text-black placeholder-gray-400"
            aria-label="Search"
            required
          />

          {/* Button */}
          <button
            type="submit"
            className="bg-black text-white px-4 py-1.5 rounded-md hover:bg-gray-800 transition"
          >
            <IoSearchOutline />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Search;
