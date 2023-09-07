import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {fetchUserPermissions} from "../Permissions/Permission"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function UpdatePortfolio() {
  const mod_id = 1;
  const token = localStorage.getItem("token")
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [slideImage, setSlideImage] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);
  const { id } = useParams();

  const fetchPermissions = async () => {
    const permissions = await fetchUserPermissions();
    setUserPermissions(permissions);
    console.log(permissions, "222222");
  };
  const firstValue = userPermissions[mod_id];
  console.log(firstValue)

  const handelchange = (e) => {
    const file = e.target.files[0];
    setSlideImage(file);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slideImage", slideImage);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    console.log(config, "juipg");

    await axios
      .put(`http://localhost:8000/api/update/portfolio/${id}`, formData, config)
      .then((res) => {
        setSlideImage(res);
        toast.success("Updated Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-message",
        });
        setTimeout(() => {
          Navigate("/adminport");
        }, 2000);
      }).catch((err)=>{
        toast.error("Request Denied", {
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-message",
        });
      })
  };
  useEffect(()=>{fetchPermissions()},[])
  return (
    <>
      <div className="d-flex homeie">
        <div className="content container mt-3 ms-10">
          <Link to={"/adminport"}>
            <div className="row">
              <div className="col-md-3 text-white col bg-success d-flex justify-content-between px-1 py-3 rounded ">
                <button className="btn btn-success">Back To portfolio</button>
              </div>
            </div>
          </Link>
          <div className="d-flex justify-content-around">
            <h2> Update Slides</h2>
          </div>
          <div className="slide-form">
            <div className="slideinput">
              <form encType="multipart/form-data">
                <div className="inp-cont">
                  <label className="form-lable">Name</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="inp-cont">
                  <label>Update Image</label>
                  <br />
                  <input
                    type="file"
                    name="slideImage"
                    accept="image/png,image/jpg, image/jpeg"
                    onChange={handelchange}
                  />
                </div>
                <Link className="btn btn-success mx-2" onClick={handleUpdate}>
                  Update
                </Link>
              </form>
              <ToastContainer/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdatePortfolio;
