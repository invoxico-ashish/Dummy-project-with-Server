import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUserPermissions, hasPermission } from "../Permissions/Permission";

function AdminTeam() {
  const id = localStorage.getItem("admin_id");
  const [team, setteam] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);
  const permission = sessionStorage.getItem("permission for");
  const module = sessionStorage.getItem("moduleID for");
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
    console.log(permissions, "ttttttttttttt");
    // console.log(hasPermission, "FFFFF");
  };

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
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
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
            {id === "20" || (permission === "2" && module === "3") ? (
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
                <th scope="col">image</th>
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
                  {id === "20" || (permission === "2" && module === "3") ? (
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
                            onClick={(e) => handleDeleteTeamById(item.team_id)}
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
        </div>
      </div>
    </>
  );
}

export default AdminTeam;
