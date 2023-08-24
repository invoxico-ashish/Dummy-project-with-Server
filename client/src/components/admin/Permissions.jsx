import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";

function Permissions() {
  const { id } = useParams();
  const [perData, setPerData] = useState([]);
  const [options, setOptions] = useState([]);


  const GetPermisionData = async () => {
    try {axios.get("http://localhost:8000/api/get/module/data")
        .then((res) => setPerData(res.data.result))
        // .then((res) => console.log(perData, "jmdfoiugh"));
    } catch (error) {console.log(error);}
  };

  const assignedPermissionData = async () => {
    try {const response = await axios.get(`http://localhost:8000/api/permission/option/value/${id}`);

      const permissionResp = response.data.result;
      const indexMapping = {};
      const newArr = permissionResp.map((item) => {
        const newIndex = item.module_id;
        indexMapping[newIndex] = item.permission_value;
        return newIndex;
      });
      setOptions(indexMapping);
      return indexMapping;
    } catch (error) {console.log(error)}
  };
  useEffect(() => {GetPermisionData();assignedPermissionData();}, []);

  const handleChange = async (admin_id, permissions, module_id) => {
    const data = {admin_id: admin_id,permissions: permissions,module_id: module_id,
    };
    await axios.post(`http://localhost:8000/api/permission/module/value/${id}`, data)
      .then((res) => {toast.success("permission Successfuly assigned", {position: toast.POSITION.TOP_RIGHT})});
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
                <th>Module Name</th>
                <th>Permissions</th>
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
                      <option
                        value="0"
                        selected={options[item.id] === 0 ? "selected" : ""}
                      >
                        none
                      </option>
                      <option
                        value="1"
                        selected={options[item.id] === 1 ? "selected" : ""}
                      >
                        Read
                      </option>
                      <option
                        value="2"
                        selected={options[item.id] === 2 ? "selected" : ""}
                      >
                        Edit
                      </option>
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


