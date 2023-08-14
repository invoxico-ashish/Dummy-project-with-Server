import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { PiSlideshowBold } from "react-icons/pi";
import { RiTeamFill } from "react-icons/ri";
import { IoMdAlbums } from "react-icons/io";
import { Link, Navigate } from "react-router-dom";
import { TbUsersPlus } from "react-icons/tb";
import { TbUsersGroup } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { Outlet } from "react-router-dom";
import "./Style/Home.css";
import { useLocation } from "react-router-dom";

function AdminNavbar() {
  const location = useLocation();
  console.log(location.pathname);
  const user = sessionStorage.getItem("user");
  const handleDelete = () => {
    axios
      .get("http://localhost:8000/api/logout")
      .then((res) => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
        Navigate("/admin");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="navbarMain">
        <nav className="navbarLine navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-targer="#navbarm"
              aria-controls="#navbarm"
              aria-expanded="false"
              aria-label="Toggle-navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-md-center">
              <ul className="navbar-nav">
                <li className="nav-item mx-2">
                  <Link to={"/dashboard"} className="nav-link text-white">
                    Home
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link text-white" onClick={handleDelete}>
                    <span className="ml-2">LogOut</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {location.pathname === "/admin" ? (
          ""
        ) : (
          <>
            <div className="d-flex sidebar flex-column flex-shrink-0 text-white bg-dark">
              <ul className="nav -nav-pils flex-column mb-auto px-0">
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link text-white">
                    <MdOutlineDashboard />{" "}
                    <span className="ml-2">Dashboard</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/adminport" className="nav-link text-white">
                    <IoMdAlbums /> <span className="ml-2">Portfolio</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/slideradmin" className="nav-link text-white">
                    <PiSlideshowBold /> <span className="ml-2">Slider</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/teamadmin" className="nav-link text-white">
                    <RiTeamFill /> <span className="ml-2">Team</span>
                  </Link>
                </li>
                {user === "0" ? (
                  ""
                ) : (
                  <li className="nav-item">
                    <Link to="/newadmin" className="nav-link text-white">
                      <TbUsersPlus /> <span className="ml-2">Add New User</span>
                    </Link>
                  </li>
                )}

                <li className="nav-item">
                  <Link to="/userlist" className="nav-link text-white">
                    <TbUsersGroup /> <span className="ml-2">Users List</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" onClick={handleDelete}>
                    <FiLogOut /> <span className="ml-2">LogOut</span>
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default AdminNavbar;
