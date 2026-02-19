import { useEffect, useState } from "react";
import axios from "axios";

function UseGetAllUser() {
  const [allUser, setAllUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/user/allUsers`, {
          withCredentials: true, // cookie automatically send হবে
        });

        console.log("All users response:", response.data);
        setAllUser(response.data.filterUser); // backend sends { filterUser: [...] }
      } catch (error) {
        console.error("Error fetching all users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getAllUser();
  }, []);

  return [allUser, isLoading];
}

export default UseGetAllUser;
