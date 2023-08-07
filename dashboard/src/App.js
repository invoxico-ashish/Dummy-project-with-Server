import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeSec from "./Components/HomeSec";
import Header from "./Components/Header";
import AddSlider from "./Components/AddSlider";
import Navbar from "./Components/Navbar";
import EditSlide from "./Components/EditSlide";
import OurTeam from "./Components/OurTeam";
import Slider from "./Components/Silder";
import PortFolio from "./Components/PortFolio";
import UpdateTeam from "./Components/UpdateTeam";
import AddTeam from "./Components/AddTeam";
import AddPortfolio from "./Components/AddPortfolio";
import UpdatePortfolio from "./Components/UpdatePortfolio";
import LoginPage from "./Components/LoginPage";
import AddNewUser from "./Components/AddNewUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/resgister" element={<AddNewUser />} />
          <Route path="/dashboard" element={<HomeSec />} />
          <Route path="/slides" element={<Slider />} />
          <Route path="/editslides" element={<AddSlider />} />
          <Route path="/updateslide/:id" element={<EditSlide />} />
          <Route path="/team" element={<OurTeam />} />
          <Route path="/updateteam/:id" element={<UpdateTeam />} />
          <Route path="/addteam" element={<AddTeam />} />
          <Route path="/portfolio" element={<PortFolio />} />
          <Route path="/addportfolio" element={<AddPortfolio />} />
          <Route path="/Updateport/:id" element={<UpdatePortfolio />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
