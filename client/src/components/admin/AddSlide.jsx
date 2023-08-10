import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

function AddSlide() {
  const Navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [imgname, setimgname] = useState("");
  const [slideImage, setSlideImage] = useState([]);

  const handelImageChange = (e) => {
    const file = e.target.files[0];
    setSlideImage(file);
  };

  const fetchData = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("imgname", imgname);
    formData.append("slideImage", slideImage);
    axios
      .post("http://localhost:8000/api/img", formData)
      .then((response) => {
        setSlideImage(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClick = (e) => {
    e.preventDefault();
    fetchData();
    Navigate("/slideradmin");
  };
  return (
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
                  {" "}
                  <button className="btn btn-success" onClick={handleClick}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddSlide;
