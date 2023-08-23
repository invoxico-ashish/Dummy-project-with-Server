import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotAuth from "../NotAuth";
import { fetchUserPermissions } from "../Permissions/Permission";

function AddTeam() {
  const mod_id = 3;
  const id = localStorage.getItem("admin_id");
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [slideImage, setSlideImage] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);

  const fetchPermissions = async () => {
    const permissions = await fetchUserPermissions();
    setUserPermissions(permissions);
    //  console.log(permissions, "3333333333333333");
  };

  const firstValue = userPermissions[mod_id];
  // console.log(firstValue,"first")

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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddTeam = async (e) => {
    e.preventDefault();
    FetchData();
    Navigate("/teamadmin");
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
              <Link to={"/teamadmin"}>
                <div className="row">
                  <div className="col-md-3 text-white col bg-success d-flex justify-content-between px-1 py-3 rounded ">
                    <button className="btn btn-success">Back To Team</button>
                  </div>
                </div>
              </Link>
              <div className="d-flex justify-content-around">
                <h2> Team</h2>
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
                      <button
                        onClick={handleAddTeam}
                        className="btn btn-success"
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

export default AddTeam;
