import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

function UpdatePortfolio() {
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [slideImage, setSlideImage] = useState([]);
  const { id } = useParams();

  const handelchange = (e) => {
    const file = e.target.files[0];
    setSlideImage(file);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slideImage", slideImage);

    await axios
      .put(`http://localhost:8000/api/update/portfolio/${id}`, formData)
      .then((res) => {
        console.log(res, "check the res");
        setSlideImage(res);
      })
      .then((res) => {
        Navigate("/portfolio");
      });
  };
  return (
    <>
      <AdminNavbar />
      <div className="d-flex home">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdatePortfolio;
