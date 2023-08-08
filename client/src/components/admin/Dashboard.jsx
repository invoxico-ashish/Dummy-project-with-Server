import React, { useEffect, useState } from "react";
import "./Style/Home.css";
import AdminNavbar from "./AdminNavbar";
import { Link, useSearchParams } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const FetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("http://localhost:8000/api/admin/details");
        console.log(res.data.data);
        setData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    FetchData();
  }, []);
  const handleDelete = async (id) => {
    const confirm = window.confirm(`would you like to delete the ${id}`);
    if (confirm) {
      axios
        .delete("http://localhost:8000/api/delete/admin/" + id)

        .then((response) => {
          console.log(response);
        })
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
      <AdminNavbar />
      <div className="d-flex home">
        <div className="content container mt-3">
          <div className="row">
            <div className="col-md-3 text-white col bg-success d-flex justify-content-around px-1 py-3 rounded">
              <p>Total User</p>
            </div>
          </div>
          <div className="d-flex justify-content-around">
            <h2>Users</h2>
            <Link to={"/newadmin"}>
              <button className="btn btn-success">+Add</button>
            </Link>
          </div>
          <table className="table w-100">
            <thead>
              <tr>
                <th scope="col">admin_id</th>
                <th scope="col">name</th>
                <th scope="col">email</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.admin_id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <Link to={`/updateadmin/${item.admin_id}`}>
                      <button className="btn btn-success mx-2">Edit</button>
                    </Link>

                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(item.admin_id)}
                    >
                      <span>
                        <TiDelete />
                      </span>
                      Delete
                    </button>
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

export default Dashboard;
