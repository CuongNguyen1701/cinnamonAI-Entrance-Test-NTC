import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const UserAuthenticate = () => {
  const { id } = useParams();
  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_BACKEND_URL}/api/current_user`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return <div>Redirecting... {id}</div>;
};

export default UserAuthenticate;
