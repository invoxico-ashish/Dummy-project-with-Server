import React, { useEffect, useState } from "react";
import { Link, Outlet, useActionData } from "react-router-dom";
import axios from "axios";

function Footer() {
  const [nav_linksData, setNav_linksData] = useState([]);
  const FetchedData = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/get/footer_modules`
    );
    setNav_linksData(response.data.result);
  };
  const handleNavlinkClick = (url, target) => {
    if (target === "_blank") {
      window.open(url, "_blank");
    }
  }
  useEffect(() => {
    FetchedData();
  }, []);
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
                {nav_linksData.map((value) => (
                  <Link
                    to={`${value.foo_link_LINKS}`}
                    className=""
                    onClick={() => {
                      handleNavlinkClick(
                        value.foo_link_LINKS,
                        value.foo_link_target
                      );
                    }}
                  >
                    {value.foo_link_title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
