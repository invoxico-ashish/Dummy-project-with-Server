import React from "react";
import Navbar from "../Header/Navbar/Navbar";
import About from "../About/About";
import Portfolio from "../Portfolio/Portfolio";
import OurTeam from "../Team/OurTeam";
import Slider from "../Header/Slider/Slider";

function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Slider />
      <About />
      <Portfolio />
      <OurTeam />
    </>
  );
}

export default Home;
