import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Portfolio from "./components/Portfolio/Portfolio";
import OurTeam from "./components/Team/OurTeam";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Header/Navbar/Navbar";
import GetInTouch from "./components/GetInTouch/GetInTouch";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/team" element={<OurTeam />} />
      </Routes>
      <GetInTouch />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
