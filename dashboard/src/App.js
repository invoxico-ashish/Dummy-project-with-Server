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
import Protected from "./Components/Protected";
import UpdateAdmin from "./Components/UpdateAdmin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/resgister" element={<AddNewUser />} />
          <Route path="/dashboard"element={<Protected><HomeSec /></Protected>}/>
          <Route path="/slides" element={<Protected><Slider /></Protected>} />
          <Route path="/editslides" element={<Protected><AddSlider /></Protected>} />
          <Route path="/updateslide/:id" element={<Protected><EditSlide /></Protected>} />
          <Route path="/team" element={<Protected><OurTeam /></Protected>} />
          <Route path="/updateteam/:id" element={<Protected><UpdateTeam /></Protected>} />
          <Route path="/addteam" element={<Protected><AddTeam /></Protected>} />
          <Route path="/portfolio" element={<Protected><PortFolio /></Protected>} />
          <Route path="/addportfolio" element={<Protected><AddPortfolio /></Protected>} />
          <Route path="/Updateport/:id" element={<Protected><UpdatePortfolio /></Protected>} />
          <Route path="/Updateadmin/:id" element={<Protected><UpdateAdmin /></Protected>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
