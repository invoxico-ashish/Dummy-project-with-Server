import React from "react";
import Navbar from "./Navbar/Navbar";
import Slider from "./Slider/Slider";
import "./Header.css"

function Header() {
  return (
    <div>
      <Navbar/>
      <Slider />
    </div>
  );
}

export default Header;
