import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

function UpdateAdmin() {
  const Navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  // const [email, setEmail] = useState("");
  const { id } = useParams();

  const handleUpdate = async () => {
    axios
      .put(`http://localhost:8000/api/update/admin/det/${id}`, values)
      .then((res) => {
        setValues(res);
      })
      .then((res) => {
        Navigate("/userlist");
      });
  };
  return (
    <>
      <div className="d-flex homeie">
        <div className="content container mt-3 ms-10">
          <Link to={"/userlist"}>
            <div className="row">
              <div className="col-md-3 text-white col bg-success d-flex justify-content-between px-1 py-3 rounded ">
                <button className="btn btn-success">Back To List</button>
              </div>
            </div>
          </Link>
          <div className="d-flex justify-content-around">
            <h2> Update Admin</h2>
          </div>
          <div className="slide-form">
            <div className="slideinput">
              <form>
                <div className="inp-cont">
                  <label className="form-lable">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                  />
                </div>
                <div className="inp-cont">
                  <label className="form-lable">email</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
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
