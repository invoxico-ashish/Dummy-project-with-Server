import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchUserPermissions,

} from "../Permissions/Permission";

function AdminPortfolio() {
  const id = localStorage.getItem("admin_id");

  const [portfoimg, setPortfoimg] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);

  const fetchPermissions = async () => {const permissions = await fetchUserPermissions();
    setUserPermissions(permissions);
    console.log(permissions, "ttttttttttttt");
    console.log(userPermissions, "FFFFF");
    // console.log(hasPermission, "FFFFF");
  };

  const FetchPortimg = async () => {
    try {const PortImg = await axios.get("http://localhost:8000/api/get/img/port");
      setPortfoimg(PortImg.data);
    } catch (error) {console.log(error);}
  };

  useEffect(() => {
    fetchPermissions();
    FetchPortimg();

  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(`would you like to delete the ${id}`);
    if (confirm) {
      await axios
        .delete(`http://localhost:8000/api/delete/portfolio/${id}`)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {console.log(err)});
    }
  };
  return (
    <>
      <div className="d-flex homeie">
        <div className="content container mt-3">
          <div className="row">
            <div className="col-md-3 text-white col bg-success d-flex justify-content-around px-1 py-3 rounded">
              <h4>Our portfolio</h4>
            </div>
          </div>
          {/* {hasPermission(userPermissions, "2") ? (
            <div className="d-flex justify-content-around">
              <Link to={"/addport"}>
                <button className="btn btn-success">+Add</button>
              </Link>
            </div>
          ) : (
            ""
          )} */}

          <table className="table w-100">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Title</th>
                <th scope="col">Image</th>
                <th scope="col">Actions</th>
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

                  {id === "20" ||
                  (userPermissions[1].permission === 2 &&
                    userPermissions[1].module === 1) ? (
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
        </div>
      </div>
    </>
  );
}

export default AdminPortfolio;
