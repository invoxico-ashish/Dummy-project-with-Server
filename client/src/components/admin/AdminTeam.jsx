import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
function AdminTeam() {
  // const user = sessionStorage.getItem("user");
  const [team, setteam] = useState([]);

  useEffect(() => {
    const FetchTeam = async () => {
      try {
        const Teamres = await axios.get(
          "http://localhost:8000/api/get/our/team"
        );
        setteam(Teamres.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    FetchTeam();
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
            <Link to={"/addteam"}>
              <button className="btn btn-success">+Add</button>
            </Link>
          </div>
          <table className="table w-100">
            <thead>
              <tr>
                <th scope="col">Team id</th>
                <th scope="col">name</th>
                <th scope="col">image</th>
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

                  <td>
                    <div className="modalContainer">
                      <Link to={`/updateteam/${item.team_id}`}>
                        <button className="btn btn-success mx-2">edit</button>
                      </Link>

                      <button
                        className="btn btn-danger"
                        onClick={(e) => handleDeleteTeamById(item.team_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
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
