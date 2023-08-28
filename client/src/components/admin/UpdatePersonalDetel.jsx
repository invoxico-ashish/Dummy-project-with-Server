import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Style/Home.css";
import RotateLoader from "react-spinners/RotateLoader";

function UpdatePersonalDetel() {
  //   const id = localStorage.getItem("admin_id");
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ProfileImage, setProfileImage] = useState([]);
  const [contact, setContact] = useState("");
  let [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  const handleChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("ProfileImage", ProfileImage);

    await axios
      .put(`http://localhost:8000/api/update/personal/details/${id}`, formData)
      .then((res) => setLoading(true))
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
          Navigate("/useraccount");
        }, 1000);
      });
  };

  return (
    <>
      <div className="d-flex homeie">
        <div className="content container mt-3 ms-10">
          <Link to={"/useraccount"}>
            <div className="row">
              <div className="col-md-3 text-white col bg-success d-flex justify-content-between px-1 py-3 rounded ">
                <button className="btn btn-success">Back To User Info</button>
              </div>
            </div>
          </Link>
          <div className="d-flex justify-content-around">
            <h5> Update personal Information</h5>
          </div>
          <div className="slide-form">
            <div className="slideinput">
              {loading ? (
                <RotateLoader
                  color="#36d7b7"
                  loading={loading}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  className="loader"
                />
              ) : (
                <>
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
                      <label className="form-lable">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="inp-cont">
                      <label className="form-lable">Contact</label>
                      <input
                        type="number"
                        name="contact"
                        className="form-control"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>
                    <div className="label-div">
                      <label>Update Image</label>
                      <br />
                      <div className="linear-dv">
                        <input
                          type="file"
                          name="ProfileImage"
                          accept="image/png,image/jpg, image/jpeg"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="inp-btn">
                      <button
                        type="submit"
                        onClick={handleUpdate}
                        className="btn btn-success mx-2"
                      >
                        Update
                      </button>
                      <div className="chng-pass">
                        <Link to={`/changepassword/${id}`}>
                          Change Password
                        </Link>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdatePersonalDetel;
