import React from "react";
import "./Style/Home.css";
import { Link } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
function HomeSec() {
  return (
    <>
      <div className="d-flex home">
        <div className="content container mt-3">
          <div className="row">
            <div className="col-md-3 text-white col bg-success d-flex justify-content-around px-1 py-3 rounded">
              <p>Total User</p>
            </div>
          </div>
          <div className="d-flex justify-content-around">
            <h2>Users</h2>
            <button className="btn btn-success">+Add</button>
          </div>
          <table className="table w-100">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Title</th>
                <th scope="col">email</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>ashish</td>
                <td>ashish@yahoo.com</td>
                <td>
                  <button className="btn btn-success mx-2">Edit</button>
                  <button className="btn btn-danger">
                    <span>
                      <TiDelete />
                    </span>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default HomeSec;
