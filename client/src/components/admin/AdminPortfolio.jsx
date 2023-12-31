import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import NotAuth from "../NotAuth";
import { fetchUserPermissions } from "../Permissions/Permission";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminPortfolio() {
  const mod_id = 1;
  const id = localStorage.getItem("admin_id");
  const [portfoimg, setPortfoimg] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);

  const fetchPermissions = async () => {
    const permissions = await fetchUserPermissions();
    setUserPermissions(permissions);
  };
  const firstValue = userPermissions[mod_id];
  const FetchPortimg = async () => {
    try {
      const PortImg = await axios.get("http://localhost:8000/api/get/img/port");
      setPortfoimg(PortImg.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(`would you like to delete the ${id}`);
    if (confirm) {
      await axios
        .delete(`http://localhost:8000/api/delete/portfolio/${id}`)
        .then((res) => {
          toast.success("Deleted Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            className: "toast-message",
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          toast.error("Request Denied", {
            position: toast.POSITION.TOP_RIGHT,
            className: "toast-message",
          });
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchPermissions();
    FetchPortimg();
  }, []);

  return (
    <>
      {firstValue === 0 ? (
        <NotAuth />
      ) : firstValue === "1" || "2" || id === "20" ? (
        <>
          <div className="d-flex homeie">
            <div className="content container mt-3">
              <div className="row">
                <div className="col-md-3 text-white col bg-success d-flex justify-content-around px-1 py-3 rounded">
                  <h4>Our portfolio</h4>
                </div>
              </div>
              {id === "20" || firstValue === 2 ? (
                <div className="d-flex justify-content-around">
                  <Link to={"/addport"}>
                    <button className="btn btn-success">+Add</button>
                  </Link>
                </div>
              ) : (
                ""
              )}

              <table className="table w-100">
                <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">Title</th>
                    <th scope="col">Image</th>
                    {id === "20" || firstValue === 2 ? (
                      <th scope="col">Actions</th>
                    ) : (
                      ""
                    )}
                  </tr>
                </thead>
                <tbody>
                  {portfoimg.map((item, index) => (
                    <tr key={index}>
                      <td>{item.portF_id}</td>
                      <td>{item.name}</td>
                      <td>
                        <img
                          src={`http://localhost:8000/img/${item.image}`}
                          alt=""
                          className="tableImage"
                        />
                      </td>

                      {id === "20" || firstValue === 2 ? (
                        <>
                          <td>
                            <Link to={`/updateport/${item.portF_id}`}>
                              <button className="btn btn-success mx-2 btn-sm">
                                Edit
                              </button>
                            </Link>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(item.portF_id)}
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
              <ToastContainer />
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default AdminPortfolio;
