import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Style/Home.css";
function Account() {
  const id = localStorage.getItem("admin_id");
  // console.log(id);
  const [personDetail, setPerSonDetails] = useState([]);

  const FatchDetails = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        `http://localhost:8000/api/admin/detail/${id}`
      );
      setPerSonDetails(res.data.result);
      // console.log(personDetail, "staejkpersonDetail");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FatchDetails();
  }, []);
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
            <Link to={`/personaldetail/${id}`}>
              <span className="btn btn-danger btn-sm">Update Info</span>
            </Link>
          </div>
        </div>
        <div className="Grid-sys">
          {personDetail.map((item) => (
            <>
              <table className="table w-50" key={item.admin_id}>
                <thead>
                  <tr>
                    <th scope="col">Personal Details</th>
                  </tr>
                </thead>

                <tbody key={item.admin_id}>
                  <tr>
                    <th>Id </th>
                    <td>{item.admin_id}</td>
                  </tr>
                  <tr>
                    <th>Email </th>
                    <td>{item.email}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td> {item.name}</td>
                  </tr>
                  <tr>
                    <th>Contact</th>
                    <td>{item.contact_no}</td>
                  </tr>
                </tbody>
              </table>
              <div className="img-conatiner"  >
                <img
                  src={`http://localhost:8000/img/${item.Profile_pic}`}
                  alt=""
                />
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Account;
