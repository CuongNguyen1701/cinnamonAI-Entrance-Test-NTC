import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useId, useEffect } from "react";
import { Navbar, MainPage, Login } from "./components";
import { LoginSuccess, LoginError } from "./components/LoginComponents";
import axios from "axios";
const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
