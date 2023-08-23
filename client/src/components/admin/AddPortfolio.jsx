import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserPermissions } from "../Permissions/Permission";
import NotAuth from "../NotAuth";
import axios from "axios";

function AddPortfolio() {
  const mod_id = 1;
  const id = localStorage.getItem("admin_id");

  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [slideImage, setSlideImage] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);
  const fetchPermissions = async () => {
    const permissions = await fetchUserPermissions();
    setUserPermissions(permissions);

  };
  const firstValue = userPermissions[mod_id];
  console.log(firstValue);

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
  useEffect(() => {
    fetchPermissions();
  }, []);
  return (
    <>
      {firstValue === 2 || id === "20" ? (
        <>
          <div className="d-flex homeie">
            <div className="content container mt-3 ms-10">
              <Link to={"/adminport"}>
                <div className="row">
                  <div className="col-md-3 text-white col bg-success d-flex justify-content-between px-1 py-3 rounded ">
                    <button className="btn btn-success">
                      Back To Portfolio
                    </button>
                  </div>
                </div>
              </Link>
              <div className="d-flex justify-content-around">
                <h2> Update Portfolio</h2>
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
                      <button
                        className="btn btn-success"
                        onClick={handleAddPort}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <NotAuth />
      )}
    </>
  );
}

export default AddPortfolio;
