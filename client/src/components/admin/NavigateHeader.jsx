import React, { useEffect, useState } from "react";
import "./Style/Home.css";
import { BiEdit, BiCommentEdit } from "react-icons/bi";
import { MdDeleteSweep } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";

function NavigateHeader() {
  const [moduleData, setModuleData] = useState([]);

  const fetchModule = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/get/module/data`
    );
    console.log(response.data.result);
    setModuleData(response.data.result);
  };
  useEffect(() => {
    fetchModule();
  }, []);
  return (
    <>
      <div className="top">
        <div className="first-top">
          <h5>Navigation Page Listing</h5>
        </div>
        <div className="main-cont">
          <div className="navigate-home">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {moduleData.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.module_name}</td>
                    <td>button</td>
                    <td>
                      <div className="buttons">
                        <div className="logoo">
                          <Link>
                            <BiEdit color="white" size={20} />
                          </Link>
                        </div>
                        <div className="logo">
                          <Link>
                            <MdDeleteSweep color="white" size={20} />
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavigateHeader;
