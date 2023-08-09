import React from "react";
import { Link, Outlet } from "react-router-dom";

function Footer() {
  return (
    <>
      <Outlet />
      <footer className="footer_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6">
              <p>
                &copy; <span id="displayYear"></span> All Rights Reserved.
                Design by
                <Link> Ashish rahi</Link>
              </p>
            </div>
            <div className="col-xl-6">
              <div className="link_box">
                <Link to="/" className="">
                  Home
                </Link>
                <Link to={"/about"} className="">
                  About
                </Link>
                <Link to={"/portfolio"} className="">
                  Portfolio
                </Link>
                <Link to={"/team"} className="">
                  Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
