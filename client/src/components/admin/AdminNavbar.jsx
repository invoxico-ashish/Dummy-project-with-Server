import React, { useEffect, useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { PiSlideshowBold } from "react-icons/pi";
import { RiTeamFill } from "react-icons/ri";
import { IoMdAlbums } from "react-icons/io";
import { FaBloggerB } from "react-icons/fa";
import { Link, Navigate, useLocation, Outlet } from "react-router-dom";
import { TbUsersPlus, TbUsersGroup } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoNavigate } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import "./Style/Home.css";
import axios from "axios";
import { fetchUserPermissions } from "../Permissions/Permission";

function AdminNavbar() {
  const id = localStorage.getItem("admin_id");
  const port_id = 1;
  const Slider_id = 2;
  const Team_id = 3;
  const nav_id = 4;
  const blog_id = 5;

  const location = useLocation();
  const [portPermission, setPortmission] = useState([]);
  const [profile, setProfile] = useState(false);
  const [profilepicture, setProfilePicture] = useState("");

  const FetchPermision = async () => {
    const permission = await fetchUserPermissions();
    setPortmission(permission);
  };
  const portValue = portPermission[port_id];
  const slideValue = portPermission[Slider_id];
  const TeamValue = portPermission[Team_id];
  const NavigateValue = portPermission[nav_id];
  const blogValue = portPermission[blog_id];

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

  const pro_file_pic = async () => {
    const res = await axios.get(`http://localhost:8000/api/admin/detail/${id}`);
    setProfilePicture(res.data.result);
  };
  useEffect(() => {
    FetchPermision();
    pro_file_pic();
  }, []);

  const showProfile = () => {
    setProfile(true);
  };
  const handleClose = () => {
    setProfile(false);
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
            {location.pathname === "/admin" ? (
              ""
            ) : (
              <div className="collapse navbar-collapse lestOne ">
                <div className="Home-sec">
                  <ul className="navbar-nav newOne">
                    <li className="nav-item mx-2">
                      <Link to={"/dashboard"} className="nav-link text-white">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item mx-2">
                      <Link
                        className="nav-link text-white"
                        onClick={handleDelete}
                      >
                        <span className="ml-2">LogOut</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="profile-div ">
                  <ul className="navbar-nav newOne">
                    <li className="nav-item mx-2">
                      {profile === true ? (
                        <Link onClick={handleClose}>
                          <GiHamburgerMenu size={20} color="white" />
                        </Link>
                      ) : (
                        <Link onClick={showProfile}>
                          <CgProfile size={20} color="white" />
                        </Link>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </nav>

        {location.pathname === "/admin" || location.pathname === "/newadmin" ? (
          ""
        ) : (
          <>
            <div className="d-flex sidebar flex-column flex-shrink-0 text-white bg-dark">
              <ul className="nav -nav-pils flex-column mb-auto px-0">
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link text-white">
                    <MdOutlineDashboard />
                    <span className="ml-2">Dashboard</span>
                  </Link>
                </li>
                {id === "20" || portValue == 1 || portValue == 2 ? (
                  <li className="nav-item">
                    <Link to="/adminport" className="nav-link text-white">
                      <IoMdAlbums /> <span className="ml-2">Portfolio</span>
                    </Link>
                  </li>
                ) : (
                  ""
                )}

                {id === "20" || slideValue == 1 || slideValue == 2 ? (
                  <li className="nav-item">
                    <Link to="/slideradmin" className="nav-link text-white">
                      <PiSlideshowBold /> <span className="ml-2">Slider</span>
                    </Link>
                  </li>
                ) : (
                  ""
                )}

                {id === "20" || TeamValue == 1 || TeamValue == 2 ? (
                  <li className="nav-item">
                    <Link to="/teamadmin" className="nav-link text-white">
                      <RiTeamFill /> <span className="ml-2">Team</span>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {id === "20" || NavigateValue == 1 || NavigateValue == 2 ? (
                  <li className="nav-item">
                    <Link to={"/navigation"} className="nav-link text-white">
                      <IoNavigate /> <span className="ml-2">Navigation</span>
                    </Link>
                  </li>
                ) : (
                  ""
                )}

                {id === "20" || blogValue == 1 || blogValue == 2 ? (
                  <li className="nav-item">
                    <Link className="nav-link text-white" to={"/show/blog_cate"}>
                      <BiCategory /> <span className="ml-2">Blog category</span>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                   {id === "20" || blogValue == 1 || blogValue == 2 ? (
                  <li className="nav-item">
                    <Link className="nav-link text-white" to={"/blog"}>
                      <FaBloggerB /> <span className="ml-2">Blogs</span>
                    </Link>
                  </li>
                ) : (
                  ""
                )}

                {id === "20" ? (
                  <>
                    <li className="nav-item">
                      <Link to="/newadmin" className="nav-link text-white">
                        <TbUsersPlus />
                        <span className="ml-2">Add New User</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/userlist" className="nav-link text-white">
                        <TbUsersGroup />
                        <span className="ml-2">Users List</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/settings"} className="nav-link text-white">
                        <FiSettings /> <span className="ml-2">Settings</span>
                      </Link>
                    </li>
                  </>
                ) : null}
                <li className="nav-item">
                  <Link to={"/useraccount"} className="nav-link text-white">
                    <CgProfile /> <span className="ml-2">Account</span>
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
        {profile === true ? (
          <div className="profile">
            <div className="pages">
              <img
                src={`http://localhost:8000/img/${profilepicture[0].Profile_pic}`}
                alt=""
                className="ProfilePic"
              />
            </div>
            <div className="pages">
              <Link
                to={"/useraccount"}
                className="text-white"
                onClick={handleClose}
              >
                Profile
              </Link>
            </div>
            <div className="pages" onClick={handleDelete}>
              <Link className="text-white">Log-Out</Link>
            </div>
            <div className="pages" onClick={handleClose}>
              <Link className="text-white">close</Link>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <Outlet />
    </>
  );
}

export default AdminNavbar;
