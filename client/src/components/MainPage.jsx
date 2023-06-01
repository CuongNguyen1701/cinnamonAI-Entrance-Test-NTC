import { About, Hero, StarsCanvas, FileInput } from "./MainPageComponents";
import React, { useState } from "react";

const MainPage = () => {
  return (
    <>
      <Hero />
      <div className="relative z-0">
        <FileInput />
      </div>
      <About />
      <StarsCanvas />
    </>
  );
};

export default MainPage;
