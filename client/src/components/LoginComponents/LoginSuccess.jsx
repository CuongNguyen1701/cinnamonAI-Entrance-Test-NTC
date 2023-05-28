import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LoginSuccess = ({ setUserData, updateHistory }) => {
  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_BACKEND_URL}/api/current_user`,
        {
          credentials: "include",
        }
      );
      const json_data = await response.json();
      console.log(json_data);
      localStorage.setItem("user", JSON.stringify(json_data));
      setUserData(json_data);
      updateHistory();
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div className="relative py-10 text-center font-extrabold text-3xl">
      Thanks for logging in!
    </div>
  );
};

export default LoginSuccess;
