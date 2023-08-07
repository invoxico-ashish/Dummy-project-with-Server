import React from "react";
import Navbar from "../Header/Navbar/Navbar";
import About from "../About/About";
import Portfolio from "../Portfolio/Portfolio";
import OurTeam from "../Team/OurTeam";
import Slider from "../Header/Slider/Slider";

function Home() {
  return (
    <>
      <div>
        <Navbar  />
        <Slider />
        <About />
        <Portfolio />
        <OurTeam />
      </div>
    </>
  );
}

export default Home;
