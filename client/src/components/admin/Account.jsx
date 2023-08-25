import React from "react";
import { Link } from "react-router-dom";
function Account() {
  return (
    <>
      <div className="d-flex homeie ">
        <div className="col-md-3 text-white col bg-success d-flex justify-content-between px-1 py-3 rounded ">
          <p>Account</p>
        </div>
        <div></div>
      </div>

      <div className=" info_con">
        <div className="buttons-section">
          <div>
            <span className="btn btn-warning btn-sm"> User Info</span>
          </div>
          <div>
            <span className="btn btn-danger btn-sm">Update Info</span>
          </div>
        </div>
        <div className="Grid-sys">
          <table className="table w-50">
            <thead>
              <tr>
                <th scope="col">Details</th>
                {/* <th scope="col">name</th>
                <th scope="col">email</th>
                <th scope="col">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> USer </td>
                <td>Jhon</td>
              </tr>

              <tr>
                <td>Email</td>
                <td>houig</td>
              </tr>
              
              <tr>
                <td>Contact-No</td>
                <td>895623</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Account;
