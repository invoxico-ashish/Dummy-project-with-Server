import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotAuth from "../NotAuth";
import { fetchUserPermissions } from "../Permissions/Permission";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTeam() {
  const mod_id = 3;
  const id = localStorage.getItem("admin_id");
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [slideImage, setSlideImage] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);

  const fetchPermissions = async () => {
    const permissions = await fetchUserPermissions();
    setUserPermissions(permissions);
  };
  const firstValue = userPermissions[mod_id];
  const handleImagechange = (e) => {
    const file = e.target.files[0];
    setSlideImage(file);
  };

  const FetchData = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slideImage", slideImage);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(config, "juipg");
    await axios
      .post("http://localhost:8000/api/our/team", formData, config)
      .then((res) => {
        setName(res);
        toast.success("Updated Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-message",
        });
        setTimeout(() => {
          Navigate("/teamadmin");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Request Denied", {
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-message",
        });
      });
  };
  const handleAddTeam = async (e) => {
    e.preventDefault();
    FetchData();
  };
  useEffect(() => {
    fetchPermissions();
  }, []);
  return (
    <>
      {firstValue === 2 || id === "20" ? (
        <>
          <div className="d-flex homeie">
            <div className="content container mt-3 ms-10">
              <Link to={"/teamadmin"}>
                <div className="row">
                  <div className="col-md-3 text-white col bg-success d-flex justify-content-between px-1 py-3 rounded ">
                    <button className="btn btn-success">Back To Team</button>
                  </div>
                </div>
              </Link>
              <div className="d-flex justify-content-around">
                <h2> Team</h2>
              </div>
              <div className="slide-form">
                <div className="slideinput">
                  <form encType="multipart/form-data">
                    <div className="inp-cont">
                      <label className="form-lable">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="inp-cont">
                      <input
                        type="file"
                        name="slideImage"
                        accept="image/png,image/jpg, image/jpeg"
                        onChange={handleImagechange}
                      />
                    </div>
                    <div className="inp-cont ">
                      <button
                        onClick={handleAddTeam}
                        className="btn btn-success"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <NotAuth />
      )}
    </>
  );
}

export default AddTeam;
