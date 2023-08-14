import React, { useEffect, useState } from "react";
import "./Style/Home.css";
import { RiEditBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
// import Modal from "react-modal";
import axios from "axios";

function UserList() {
  const user = sessionStorage.getItem("user");
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

  useEffect(() => {
    FetchTotalUser();
    FetchData();
  }, []);

  const Filter = (e) => {
    setRecords(
      data.filter((f) => f.name.toLowerCase().includes(e.target.value)) ||
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
            <Link to={user === "0" ? "*" : "/newadmin"}>
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
                    {user === "0" ? (
                      ""
                    ) : (
                      <>
                        <Link to={`/updateadmin/${item.admin_id}`}>
                          {/* <AiOutlineEdit size={25}/> */}
                          <button className="btn btn-success mx-2">Edit</button>
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={(e) => handleDelete(item.admin_id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                    <Link>
                      <RiEditBoxLine size={20} className="eidtBox" />

                      <select>
                        <option disabled>Select</option>
                        <option value="editor">editor</option>
                        <option value="	visitor"> visitor</option>
                        <option value="admin">admin</option>
                      </select>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="dropdown"></div>
        </div>
      </div>
    </>
  );
}

export default UserList;
