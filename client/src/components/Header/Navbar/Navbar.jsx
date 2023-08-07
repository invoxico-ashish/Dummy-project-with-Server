import React, { useState } from "react";
import "./Navbar.css";
import OpenNavbar from "../Opennavbar/OpenNavbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  // $('.custom_menu-btn').addClass('slideRight');

  return (
    <>
      <header className="header_section NavColor">
        <nav className="navbar navbar-expand-lg custom_nav-container">
          <div className="custom_menu-btn" onClick={() => setShowMenu(true)}>
            <GiHamburgerMenu size={40} />
          </div>
          <Link to={"/"} className="navbar-brand">
            <span className="headLogo">Photosec</span>
          </Link>
          <Link className="call_btn">Call Us Now</Link>
        </nav>
        {showMenu && <OpenNavbar setShowMenu={setShowMenu} />}
      </header>
    </>
  );
}

export default Navbar;
