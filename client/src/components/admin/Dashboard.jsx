import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import "./Style/Home.css";
import p1 from "../Images/p1.jpg";
import axios from "axios";

const Dashboard = () => {
  const [portimg, setPortimg] = useState([]);
  const [slideData, setSlideData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [totalAdmin, setTotalAdmin] = useState([]);
  const FetchPortImg = async () => {
    try {
      axios.get("http://localhost:8000/api/get/new/port").then((res) => {
        setPortimg(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const FetchLetSlides = async () => {
    try {
      axios.get("http://localhost:8000/api/get/latest/slide").then((res) => {
        setSlideData(res.data.data);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const FetchAdminData = async () => {
    try {
      axios
        .get("http://localhost:8000/api/get/latest/admin/user")
        .then((res) => {
          setAdminData(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const FetchTeamData = async () => {
    try {
      axios.get("http://localhost:8000/api/get/latest/team").then((res) => {
        setTeamData(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const FetchTotalUser = async () => {
    try {
      const totalUser = axios
        .get("http://localhost:8000/api/admin/count")
        .then((res) => {
          setTotalAdmin(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchTotalUser();
    FetchTeamData();
    FetchAdminData();
    FetchLetSlides();
    FetchPortImg();
  }, []);
  return (
    <>
      <div className="topDash ">
        <Link
          to={"/userlist"}
          className="dashonebox  col-md-3 text-white col bg-danger d-flex justify-content-around px-1 py-3 rounded"
        >
          {totalAdmin.map((i, index) => (
            <p key={index}>Total User {i.Total_User}</p>
          ))}
        </Link>
        <Link
          to={"/teamadmin"}
          className="dashonebox col-md-3 text-white col bg-info d-flex justify-content-around px-1 py-3 rounded"
        >
          Team
        </Link>
        <Link
          to={"/adminport"}
          className="dashonebox col-md-3 text-white col bg-dark d-flex justify-content-around px-1 py-3 rounded"
        >
          Portfolio
        </Link>
      </div>
      <div className="d-flex home">
        <div className="content container mt-3">
          <div className="row">
            <div className="col-md-3 text-white col bg-success d-flex justify-content-around px-1 py-3 rounded">
              <p>Latest Portfolio</p>
            </div>
          </div>
        </div>
      </div>
      <div className="cardSection">
        {portimg.map((item, index) => (
          <div className="card" style={{ width: "18rem" }} key={index}>
            <img
              src={`http://localhost:8000/img/${item.image}`}
              className="card-img-top image-zoom"
              alt={item.name}
            />
          </div>
        ))}
      </div>
      <div className="d-flex home">
        <div className="content container mt-3">
          <div className="row">
            <div className="col-md-3 text-white col bg-success d-flex justify-content-around px-1 py-3 rounded">
              <p>Latest Slides</p>
            </div>
          </div>
        </div>
      </div>
      <div className="cardSection">
        {slideData.map((value, index) => (
          <div className="card" style={{ width: "18rem" }} key={index}>
            <img
              src={`http://localhost:8000/img/${value.image}`}
              className="card-img-top image-zoom"
              alt={value.title}
            />
          </div>
        ))}
      </div>

      <div className="d-flex home">
        <div className="content container mt-3">
          <div className="row">
            <div className="col-md-3 text-white col bg-success d-flex justify-content-around px-1 py-3 rounded">
              <p>Latest Team</p>
            </div>
          </div>
        </div>
      </div>
      <div className="cardSection">
        {teamData.map((value, index) => (
          <div className="card" style={{ width: "18rem" }} key={index}>
            <img
              src={`http://localhost:8000/img/${value.image}`}
              className="card-img-top image-zoom"
              alt={value.name}
            />
          </div>
        ))}
      </div>
      <div className="d-flex home">
        <div className="content container mt-3">
          <div className="row">
            <div className="col-md-3 text-white col bg-success d-flex justify-content-around px-1 py-3 rounded">
              <p>Latest Users/Admin</p>
            </div>
          </div>
        </div>
      </div>
      <div className="adminContainer">
        <div className="adminDetail">
          <table className="table">
            <thead className="bg-success">
              <tr>
                <th scope="col">admin_id</th>
                <th scope="col">name</th>
                <th scope="col">email</th>
              </tr>
            </thead>
            <tbody>
              {adminData.map((value, index) => (
                <tr key={index}>
                  <td>{value.admin_id}</td>
                  <td>{value.name}</td>
                  <td>{value.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
