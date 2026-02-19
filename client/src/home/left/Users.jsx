import React from "react";
import User from "./User/User";
import UseGetAllUser from "../../context/useGetAllUser";

function Users() {
  const [allUser, isLoading] = UseGetAllUser()
  console.log("allUsers:", allUser)
  return (
    <div className="max-h-[calc(100vh-64px)]  pb-10 overflow-y-auto ">
      
      {isLoading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : ( 
        allUser.length > 0 ? (
          allUser.map((user,index) => <User key={index} user={user} />)
        ) : ( 
          <p className="text-center text-gray-500">No users found.</p>
        )
      )}
   
    </div>
  );
}

export default Users;
