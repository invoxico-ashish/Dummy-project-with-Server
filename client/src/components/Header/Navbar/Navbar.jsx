import React, { useState } from "react";
import "./Navbar.css";
import OpenNavbar from "../Opennavbar/OpenNavbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      {location.pathname === "/" ? (
        <>
          <header className="header_section ">
            <nav className="navbar navbar-expand-lg custom_nav-container">
              <div
                className="custom_menu-btn"
                onClick={() => setShowMenu(true)}
              >
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
      ) : (
        <>
          <header className="header_section NavColor">
            <nav className="navbar navbar-expand-lg custom_nav-container">
              <div
                className="custom_menu-btn"
                onClick={() => setShowMenu(true)}
              >
                <GiHamburgerMenu size={40} />
              </div>
              <Link to={"/"} className="navbar-brand" id="NewNav">
                <span className="headLogo">Photosec</span>
              </Link>
              <Link className="call_btn">Call Us Now</Link>
            </nav>
            {showMenu && <OpenNavbar setShowMenu={setShowMenu} />}
          </header>
        </>
      )}

      <Outlet />
    </>
  );
}

export default Navbar;
