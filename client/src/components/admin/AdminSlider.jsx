import React, { useEffect, useState } from "react";
import "./Style/Home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { fetchUserPermissions } from "../Permissions/Permission";

function AdminSlider() {
  const id = localStorage.getItem("admin_id");
  const [slideimg, setSlideimg] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);

  const fetchPermissions = async () => {const permissions = await fetchUserPermissions();
    setUserPermissions(permissions);
    console.log(userPermissions, "ttttttttttttttt");
 
  };
  const valuesArray = Object.values(userPermissions);
  const firstValue = valuesArray[1];
  console.log(firstValue,"1111111");

  const slideimages = async () => {
    try {const slideres = await axios.get("http://localhost:8000/api/get/img/slide");
      setSlideimg(slideres.data);
    } catch (error) {console.log(error)}
  };

  useEffect(() => {fetchPermissions(); slideimages()}, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(`would you like to delete the ${id}`);
    if (confirm) {axios.delete("http://localhost:8000/api/delete/img/" + id).then((res) => {
          window.location.reload();
        }).catch((err) => {console.log(err)});
    }};


  return (
    <>
      <div className="d-flex homeie">
        <div className="content container mt-3 ms-10">
          <div className="row">
            <div className="col-md-3 text-white col bg-success d-flex justify-content-between px-1 py-3 rounded ">
              <p>Slides</p>
            </div>
          </div>
          <div className="d-flex justify-content-around">
            <h2>Slides</h2>
            {id === "20" ? (
              <Link to={"/addslides"}>
                <button className="btn btn-success">+Add</button>
              </Link>
            ) : (
              ""
            )}
          </div>
          <table className="table w-100">
            <thead>
              <tr>
                <th scope="col">Slider_id</th>
                <th scope="col">Title</th>
                <th scope="col">Slide</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {slideimg.map((item, index) => (
                <tr key={index}>
                  <td>{item.slider_id}</td>
                  <td>{item.title}</td>
                  <td>
                    <img
                      src={`http://localhost:8000/img/${item.image}`}
                      alt=""
                      className="tableImage"
                    />
                  </td>

                  {id === "20" || firstValue === 2  ? (
                    <>
                      <td>
                        <Link
                          to={`/updateslides/${item.slider_id}`}
                          className="btn btn-success mx-2 btn-sm"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={(e) => handleDelete(item.slider_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  ) : (
                    ""
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminSlider;
