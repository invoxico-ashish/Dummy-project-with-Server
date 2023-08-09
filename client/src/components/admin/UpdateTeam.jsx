import axios from "axios";
import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

function UpdateTeam() {
  const [name, setName] = useState("");
  const [slideImage, setSlideImage] = useState([]);
  const { id } = useParams();
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const file = e.target.files[0];
    setSlideImage(file);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slideImage", slideImage);

    axios
      .put("http://localhost:8000/api/update/Team/" + id, formData)
      .then((res) => {
        console.log(res);
      })
      .then((res) => {
        Navigate("/teamadmin");
      });
  };
  return (
    <>
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
            <h2> Update Team</h2>
            {/* <h2>{props.Team_id}</h2> */}
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
                  <label>Update Image</label>
                  <br />
                  <input
                    type="file"
                    name="slideImage"
                    accept="image/png,image/jpg, image/jpeg"
                    onChange={handleChange}
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

export default UpdateTeam;
