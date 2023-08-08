import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "../AdminNavbar";

function AddTeam() {
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [slideImage, setSlideImage] = useState([]);

  const handleImagechange = (e) => {
    const file = e.target.files[0];
    setSlideImage(file);
  };

  const FetchData = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slideImage", slideImage);

    await axios
      .post("http://localhost:8000/api/our/team", formData)
      .then((res) => {
        setName(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddTeam = async (e) => {
    e.preventDefault();
    FetchData();
    Navigate("/team");
  };
  return (
    <>
      <AdminNavbar />
      <div className="d-flex home">
        <div className="content container mt-3 ms-10">
          <Link to={"/teamadmin"}>
            <div className="row">
              <div className="col-md-3 text-white col bg-success d-flex justify-content-between px-1 py-3 rounded ">
                <button className="btn btn-success">Back To Team</button>
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
                    onChange={handleImagechange}
                  />
                </div>
                <div className="inp-cont ">
                  <button onClick={handleAddTeam} className="btn btn-success">
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

export default AddTeam;
