import {
  About,
  Hero,
  StarsCanvas,
  FileInput,
  Result,
} from "./MainPageComponents";
import React, { useState } from "react";

const MainPage = () => {
  const [responseData, setResponseData] = useState(null);
  const updateResponse = (data) => {
    setResponseData(data);
  };
  return (
    <>
      <Hero />
      {/* <div className="bg-center bg-no-repeat bg-cover bg-hero-pattern">
      </div> */}
      <div className="relative z-0">
        <FileInput updateResponse={updateResponse} />
        {responseData && <Result responseData={responseData} />}
      </div>
      <About />
      <StarsCanvas />
    </>
  );
};

export default MainPage;
