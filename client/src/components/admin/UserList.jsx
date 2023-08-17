import React, { useEffect, useState } from "react";
import "./Style/Home.css";
import { Link } from "react-router-dom";
// import Modal from "react-modal";
import axios from "axios";

function UserList() {
  const id = localStorage.getItem("admin_id");

  const [data, setData] = useState([]);
  const [record, setRecords] = useState([]);
  const [totalAdmin, setTotalAdmin] = useState([]);
  const FetchData = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get("http://localhost:8000/api/admin/details");
      setData(res.data.data);
      setRecords(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const FetchTotalUser = async () => {
    try {
      const totalUser = axios
        .get("http://localhost:8000/api/admin/count")
        .then((res) => {
          setTotalAdmin(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const Filter = (e) => {
    setRecords(
      data.filter((f) => f.name.toLowerCase().includes(e.target.value)),
      data.filter((f) => f.email.toLowerCase().includes(e.target.value))
    );
  };
  const handleDelete = async (id) => {
    const confirm = window.confirm(`would you like to delete the ${id}`);
    if (confirm) {
      axios
        .delete("http://localhost:8000/api/delete/admin/" + id)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    FetchTotalUser();
    FetchData();
  }, []);

  return (
    <>
      <div className="d-flex homeie">
        <div className="content container mt-3">
          <div className="row">
            <div className="col-md-3 text-white col bg-success d-flex justify-content-around px-1 py-3 rounded">
              {totalAdmin.map((i, index) => (
                <p key={index}>Total User {i.Total_User}</p>
              ))}
            </div>
          </div>
          <div className="d-flex justify-content-around">
            <h2>Users</h2>
            <input
              type="text"
              onChange={Filter}
              placeholder="search"
              className="searchTerm"
            />
            {id === "20" ? (
              <Link to={"/newadmin"}>
                <button className="btn btn-success">+Add</button>
              </Link>
            ) : (
              ""
            )}
          </div>
          <table className="table w-100">
            <thead>
              <tr>
                <th scope="col">admin_id</th>
                <th scope="col">name</th>
                <th scope="col">email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {record.slice(0, 1).map((item, index) => (
                <tr key={index}>
                  <td>{item.admin_id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <Link>
                      {/* to={`/updateadmin/${item.admin_id}`} */}
                      <button className="btn btn-success mx-2 btn-dark btn-sm">
                        Super Admin
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
              {record.slice(1).map((item) => {
                return (
                  <tr key={item.admin_id}>
                    <td>{item.admin_id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      <Link to={`/updateadmin/${item.admin_id}`}>
                        <button className="btn btn-success mx-2 btn-sm">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={(e) => handleDelete(item.admin_id)}
                      >
                        Delete
                      </button>
                      <Link to={`/permission/${item.admin_id}`}>
                        <button className="btn btn-warning mx-2 btn-sm">
                          Permission
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="dropdown"></div>
        </div>
      </div>
    </>
  );
}

export default UserList;
