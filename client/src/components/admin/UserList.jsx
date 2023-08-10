import React, { useEffect, useState } from "react";
import "./Style/Home.css";
import AdminNavbar from "./AdminNavbar";
import { Link, useSearchParams } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { contains } from "jquery";

function UserList() {
  const [data, setData] = useState([]);
  const [record, setRecords] = useState([]);
  const [totalAdmin, setTotalAdmin] = useState([]);
  const FetchData = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get("http://localhost:8000/api/admin/details");
      console.log(res.data.data);
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
          console.log(res.data.data[0]);
          setTotalAdmin(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchTotalUser();
    FetchData();
  }, []);

  const Filter = (e) => {
    setRecords(
      data.filter((f) => f.name.toLowerCase().includes(e.target.value))
    );
  };
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
      <div className="d-flex homeie">
        <div className="content container mt-3">
          <div className="row">
            <div className="col-md-3 text-white col bg-success d-flex justify-content-around px-1 py-3 rounded">
              {totalAdmin.map((i,index) => (
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
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
              {record.map((item, index) => (
                <tr key={index}>
                  <td>{item.admin_id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
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

export default UserList;
