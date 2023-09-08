import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Style/Home.css";
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
          className="dashonebox  col-md-2 text-white col bg-danger d-flex justify-content-around px-1 py-3 rounded"
        >
          {totalAdmin.map((i, index) => (
            <p key={index}>Total User {i.Total_User}</p>
          ))}
        </Link>
        <Link
          to={"/teamadmin"}
          className="dashonebox col-md-2 text-white col bg-info d-flex justify-content-around px-1 py-3 rounded"
        >
          <p>Team</p>
        </Link>
        <Link
          to={"/adminport"}
          className="dashonebox col-md-2 text-white col bg-dark d-flex justify-content-around px-1 py-3 rounded"
        >
          <p>Portfolio</p>
        </Link>
      </div>

      <div className="firstParent home">
        <div>
          <h5 className=" user-heading ">User List -</h5>
        </div>
        <div className="userListing ">
          <table className="table">
            <thead className="bg-dark text-white ">
              <tr>
                <th scope="col">name</th>
                <th scope="col">email</th>
              </tr>
            </thead>
            <tbody>
              {adminData.map((value, index) => (
                <tr key={index}>
                  <td>{value.name}</td>
                  <td>{value.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="secChildtwo">
        <div>
          <h5>Slides</h5>
        </div>
        <div>
          <table className="table">
            <thead className="bg-dark text-white ">
              <tr>
                <th scope="col">title</th>
                <th scope="col">image</th>
              </tr>
            </thead>
            {slideData.map((item, index) => (
              // console.log(item)

              <tbody>
                <tr>
                  <td>{item.title}</td>
                  <td>
                    <img
                      src={`http://localhost:8000/img/${item.image}`}
                      alt=""
                      className="tableImage"
                    />
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>

      <div className="secChildone">
        <div>
          <h5>Portfolio</h5>
        </div>
        <div>
          <table className="table">
            <thead className="bg-dark text-white ">
              <tr>
                <th scope="col">title</th>
                <th scope="col">image</th>
              </tr>
            </thead>
            {portimg.map((item, index) => (
              // console.log(item)

              <tbody>
                <tr>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={`http://localhost:8000/img/${item.image}`}
                      alt=""
                      className="tableImage"
                    />
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
   

      <div className="thirParent home">
        <div>
          <h5>Latest Portfolio</h5>
        </div>
        <div className="thirdChild">
          <table className="table">
            <thead className="bg-dark text-white ">
              <tr>
                <th scope="col">title</th>
                <th scope="col">image</th>
              </tr>
            </thead>
            {teamData.map((item, index) => (
              // console.log(item)

              <tbody>
                <tr>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={`http://localhost:8000/img/${item.image}`}
                      alt=""
                      className="tableImage"
                    />
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>

      {/* <div className="cardSection">
        {portimg.map((item, index) => (
          <div className="card" style={{ width: "18rem" }} key={index}>
            <img
              src={`http://localhost:8000/img/${item.image}`}
              className="card-img-top image-zoom"
              alt={item.name}
            />
          </div>
        ))}
      </div> */}
    </>
  );
};

export default Dashboard;
