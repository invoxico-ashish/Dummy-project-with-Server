import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./OpenNavbar.css";
import { GrClose } from "react-icons/gr";

function OpenNavbar({ setShowMenu }) {
  // const style = { color: "white" };
  return (
    <>
      <div className="Main-cont" direction="right">
        <div onClick={() => setShowMenu(false)}className="crossArrow" >
          <GrClose size={40} />
        </div>
        <div className="inner-div">
          <NavLink
            to={"/"}
            className=" links"
            onClick={() => setShowMenu(false)}
          >
            Home
          </NavLink>
          <NavLink
            to={"/about"}
            className="links"
            onClick={() => setShowMenu(false)}
          >
            About
          </NavLink>
          <NavLink
            to={"/portfolio"}
            className="links"
            onClick={() => setShowMenu(false)}
          >
            Portfolio
          </NavLink>
          <NavLink
            to={"/team"}
            className="links"
            onClick={() => setShowMenu(false)}
          >
            team
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default OpenNavbar;
