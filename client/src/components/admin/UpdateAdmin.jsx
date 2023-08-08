import axios from "axios";
import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

function UpdateAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams;
  const Navigate = useNavigate();

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);

    axios
      .put("http://localhost:8000/api/update/admin/det/" + id, formData)
      .then((res) => {
        console.log(res);
      })
      .then((res) => {
        Navigate("/dashboard");
      });
    console.log(name, email);
  };
  return (
    <>
      <AdminNavbar />
      <div className="d-flex home">
        <div className="content container mt-3 ms-10">
          <Link to={"/dashboard"}>
            <div className="row">
              <div className="col-md-3 text-white col bg-success d-flex justify-content-between px-1 py-3 rounded ">
                <button className="btn btn-success">Back To dashboard</button>
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
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="inp-cont">
                  <label className="form-lable">email</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="inp-cont">
                  <label>Update admin</label>
                  <br />
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

export default UpdateAdmin;
