import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

function UpdateAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams;

  const handleChange = async () => {
    await axios
      .put(`http://localhost:8000/api/update/admin/det/` + id, name, email)
      .then((res) => console.log(res));
  };

  return (
    <>
      <div className="d-flex home">
        <div className="content container mt-3 ms-10">
          <Link to={"/slides"}>
            <div className="row">
              <div className="col-md-3 text-white col bg-success d-flex justify-content-between px-1 py-3 rounded ">
                <button className="btn btn-success">Back To Slides</button>
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
                <Link className="btn btn-success mx-2" onClick={handleChange}>
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
