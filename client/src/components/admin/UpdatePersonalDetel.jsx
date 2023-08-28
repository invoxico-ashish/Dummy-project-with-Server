import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdatePersonalDetel() {
  const id = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ProfileImage, setProfileImage] = useState([]);
  const [contact, setContact] = useState("");
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("ProfileImage", ProfileImage);

    await axios
      .put(`http://localhost:8000/api/update/personal/details/${id}` + formData)
      .then((res) => setProfileImage(res))
      .then((res) => console.log(res))
      .catch((err) => console.log);
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
            <h2> Update personal Information</h2>
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
                <div className="inp-cont">
                  <label>Update Image</label>
                  <br />
                  <input
                    type="file"
                    name="ProfileImage"
                    accept="image/png,image/jpg, image/jpeg"
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleUpdate}
                  className="btn btn-success mx-2"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdatePersonalDetel;
