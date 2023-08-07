import React from "react";
import { Link } from "react-router-dom";
import "./OpenNavbar.css";
import { GrClose } from "react-icons/gr";

function OpenNavbar({ setShowMenu }) {
  // const style = { color: "white" };
  return (
    <>
      <div className="Main-cont" direction="right">
        <div onClick={() => setShowMenu(false)}>
          <GrClose size={40} color="white" className="crossArrow" />
        </div>
        <div className="inner-div"><Link to={"/"}className="active links"onClick={() => setShowMenu(false)}>Home</Link>
          <Link to={"/about"}className="links"onClick={() => setShowMenu(false)}>About</Link>
          <Link to={"/portfolio"}className="links"onClick={() => setShowMenu(false)}>Portfolio</Link>
          <Link to={"/team"}className="links"onClick={() => setShowMenu(false)}>team</Link>
        </div>
      </div>
    </>
  );
}

export default OpenNavbar;
