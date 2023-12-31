import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotAuth from "../NotAuth";
import { fetchUserPermissions } from "../Permissions/Permission";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminTeam() {
  const mod_id = 3;
  const id = localStorage.getItem("admin_id");
  const [team, setteam] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);

  const FetchTeam = async () => {
    try {
      const Teamres = await axios.get("http://localhost:8000/api/get/our/team");
      setteam(Teamres.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPermissions = async () => {
    const permissions = await fetchUserPermissions();
    setUserPermissions(permissions);
  };
  const firstValue = userPermissions[mod_id];
  useEffect(() => {
    FetchTeam();
    fetchPermissions();
  }, []);

  const handleDeleteTeamById = async (id) => {
    const confirm = window.confirm(`would you like to delete the ${id}`);
    if (confirm) {
      axios
        .delete(`http://localhost:8000/api/delete/team/${id}`)
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
          console.log(err);
          toast.error("Request Denied", {
            position: toast.POSITION.TOP_RIGHT,
            className: "toast-message",
          });
        });
    }
  };
  return (
    <>
      {firstValue === 0 ? (
        <NotAuth />
      ) : firstValue === 1 || 2 || id === "20" ? (
        <>
          <div className="d-flex homeie ">
            <div className="content container mt-3 ms-10">
              <div className="row">
                <div className="col-md-3 text-white col bg-success d-flex justify-content-between px-1 py-3 rounded ">
                  <p>Our Team</p>
                </div>
              </div>
              <div className="d-flex justify-content-around">
                <h2>Team</h2>
                {id === "20" || firstValue === 2 ? (
                  <Link to={"/addteam"}>
                    <button className="btn btn-success">+Add</button>
                  </Link>
                ) : (
                  ""
                )}
              </div>
              <table className="table w-100">
                <thead>
                  <tr>
                    <th scope="col">Team id</th>
                    <th scope="col">name</th>
                    {id === "20" || firstValue === 2 ? (
                      <th scope="col">image</th>
                    ) : (
                      ""
                    )}

                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {team.map((item, index) => (
                    <tr key={index}>
                      <td>{item.team_id}</td>
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
                            <div className="modalContainer">
                              <Link to={`/updateteam/${item.team_id}`}>
                                <button className="btn btn-success mx-2 btn-sm">
                                  edit
                                </button>
                              </Link>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={(e) =>
                                  handleDeleteTeamById(item.team_id)
                                }
                              >
                                Delete
                              </button>
                            </div>
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

export default AdminTeam;
