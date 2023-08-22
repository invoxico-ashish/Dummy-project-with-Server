import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Permissions() {
  const { id } = useParams();
  const [perData, setPerData] = useState([]);

  const GetPermisionData = async () => {
    try {
      axios.get("http://localhost:8000/api/get/module/data").then((res) => setPerData(res.data.result));
    } catch (error) {console.log(error);}
  };

  useEffect(() => {GetPermisionData();}, []);

  const handleChange = async (admin_id, permissions, module_id) => {
    const data = {
      admin_id: admin_id,
      permissions: permissions,
      module_id: module_id,
    };

    await axios
      .post(`http://localhost:8000/api/permission/module/value/${id}`, data)
      .then((res) => console.log("success"))
      .then((res) => { toast.success("permission Successfuly assigned", {
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-message",
        });
      });
  };

  return (
    <>
      <div className="d-flex homeie">
        <div className="content container mt-3">
          <div className="row">
            <div className="col-md-3 text-white col bg-warning d-flex justify-content-around px-1 py-3 rounded">
              Permissions
            </div>
          </div>
          <div className="d-flex justify-content-around"></div>
          <table className="table w-50">
            <thead>
              <tr>
                <th scope="col">Module Name</th>
                <th scope="col">Permissions</th>
              </tr>
            </thead>
            <tbody>
              {perData.map((item, index) => (
                <tr key={index}>
                  <td>{item.module_name}</td>
                  <td>
                    <select
                      name="permissions"
                      onChange={(e) =>
                        handleChange(id, e.target.value, item.id)
                      }
                    >
                      <option value="0">none</option>
                      <option value="1">view</option>
                      <option value="2">edit</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Permissions;
