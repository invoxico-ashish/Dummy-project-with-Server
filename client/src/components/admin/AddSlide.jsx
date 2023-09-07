import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotAuth from "../NotAuth";
import { fetchUserPermissions } from "../Permissions/Permission";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddSlide() {
  const mod_id = 2;
  const id = localStorage.getItem("admin_id");
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [imgname, setimgname] = useState("");
  const [slideImage, setSlideImage] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);

  const fetchPermissions = async () => {
    const permissions = await fetchUserPermissions();
    setUserPermissions(permissions);
  };
  const firstValue = userPermissions[mod_id];
  const handelImageChange = (e) => {
    const file = e.target.files[0];
    setSlideImage(file);
  };

  const fetchData = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("imgname", imgname);
    formData.append("slideImage", slideImage);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(config, "juipg");
    axios
      .post("http://localhost:8000/api/img", formData, config)
      .then((response) => {
        setSlideImage(response);
      })
      .then(() =>
        toast.success("Updated Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-message",
        })
      )
      .catch((err) => {
        toast.error("Request Denied", {
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-message",
        });
        console.log(err);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetchData();
    setTimeout(() => {
      Navigate("/slideradmin");
    }, 3000);
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
              <Link to={"/slideradmin"}>
                <div className="row">
                  <div className="col-md-3 text-white col bg-success d-flex justify-content-between px-1 py-3 rounded ">
                    <button className="btn btn-success">Back To Slides</button>
                  </div>
                </div>
              </Link>
              <div className="d-flex justify-content-around">
                <h2> Slides</h2>
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="inp-cont">
                      <label className="form-lable">Image Name</label>
                      <input
                        name="imgname   "
                        type="text"
                        className="form-control"
                        value={imgname}
                        onChange={(e) => setimgname(e.target.value)}
                      />
                    </div>
                    <div className="inp-cont ">
                      <input
                        className="chooseFile"
                        type="file"
                        name="slideImage"
                        accept="image/png,image/jpg, image/jpeg"
                        onChange={handelImageChange}
                      />
                    </div>
                    <div className="inp-cont">
                      <button
                        className="btn btn-success "
                        onClick={handleClick}
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

export default AddSlide;
