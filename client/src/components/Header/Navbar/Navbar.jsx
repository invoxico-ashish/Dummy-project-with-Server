import React, { useEffect, useState } from "react";
import "./Navbar.css";
import axios from "axios";
import OpenNavbar from "../Opennavbar/OpenNavbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [result, setResult] = useState({ webLogo: "" });

  const Fetchdata = async () => {
    try {
      await axios
        .get(`http://localhost:8000/api/get/genral/settings`)
        .then((res) => setResult(res.data.keyValuePairs));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Fetchdata();
  }, []);

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
                <span className="headLogo">
                  <img
                    src={`http://localhost:8000/img/${result.webLogo}`}
                    alt=""
                  />
                </span>
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
                <span className="headLogo">
                  <img
                    src={`http://localhost:8000/img/${result.webLogo}`}
                    alt=""
                  />
                </span>
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
