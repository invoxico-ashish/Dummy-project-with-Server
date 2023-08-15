import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Permissions() {
  const { id } = useParams();
  const [perData, setPerData] = useState([]);
  const [main, setMain] = useState([]);

  const GetPermisionData = async () => {
    try {
      axios
        .get("http://localhost:8000/api/get/module/data")
        .then((res) => setPerData(res.data.result));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetPermisionData();
  }, []);
  const handleChange = (user, e, module_id) => {
    console.log(user, "useId", e, "value", module_id, "moduleId");
    setMain(user);
    console.log(main, "main state");
    axios
      .post(`http://localhost:8000/api/permission/module/value/${id}`, main)
      .then((res) => {
        console.log(res, "chguyagvsdig");
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
          <div className="d-flex justify-content-around">
            <h2></h2>
          </div>
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

              {main}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Permissions;
