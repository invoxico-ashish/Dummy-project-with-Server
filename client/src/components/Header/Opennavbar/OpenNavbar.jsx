import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./OpenNavbar.css";
import { GrClose } from "react-icons/gr";
import axios from "axios";

function OpenNavbar({ setShowMenu }) {
  const [nav_linksData, setNav_linksData] = useState([]);

  const FetchedData = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/get/nav_link/modules`
    );
    console.log(response.data.result, "res");
    setNav_linksData(response.data.result);
  };
  const handleNavlinkClick = (url, target) => {
    if (target === "_blank") {
      window.open(url, "_blank");
    }
    setShowMenu(false);
  };

  useEffect(() => {
    FetchedData();
  }, []);
  return (
    <>
      <div className="Main-cont" direction="right">
        <div onClick={() => setShowMenu(false)} className="crossArrow">
          <GrClose size={40} />
        </div>
        <div className="inner-div">
          {nav_linksData.map((value) => (
            // console.log(value,"value")
            <NavLink
              to={`${value.nav_link_LINKS}`}
              className="links"
              onClick={() => {
                handleNavlinkClick(value.nav_link_LINKS, value.nav_link_target);
              }}
            >
              {value.nav_link_title}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default OpenNavbar;
