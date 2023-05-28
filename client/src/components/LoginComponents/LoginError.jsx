import React from "react";
import { useEffect } from "react";

const LoginError = () => {
  useEffect(() => {
    window.location.href = "/login";
  }, []);
  return (
    <div className="relative text-center">
      Log in Failed! Please log in again
    </div>
  );
};

export default LoginError;
