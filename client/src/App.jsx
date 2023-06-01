import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar, MainPage } from "./components";
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
