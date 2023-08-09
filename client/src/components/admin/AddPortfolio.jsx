import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

function AddPortfolio() {
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [slideImage, setSlideImage] = useState([]);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setSlideImage(file);
  };

  const FetchData = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slideImage", slideImage);

    await axios
      .post("http://localhost:8000/api/team/portfolio", formData)
      .then((res) => {
        setName(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPort = (e) => {
    e.preventDefault();
    FetchData();
    Navigate("/adminport");
  };
  return (
    <>
      <div className="d-flex home">
        <div className="content container mt-3 ms-10">
          <Link to={"/adminport"}>
            <div className="row">
              <div className="col-md-3 text-white col bg-success d-flex justify-content-between px-1 py-3 rounded ">
                <button className="btn btn-success">Back To Portfolio</button>
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
                    onChange={handleImgChange}
                  />
                </div>
                <div className="inp-cont ">
                  <button className="btn btn-success" onClick={handleAddPort}>
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

export default AddPortfolio;
