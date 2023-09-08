import React, { useEffect, useState } from "react";
import "./Style/Home.css";
import axios from "axios";
import Modal from "react-modal";
import { BiEdit, BiCommentEdit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function NavigationSystem() {
  const Navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editmodalIsOpen, setEditmodalIsOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState([true, true, true]);
  const [moduleName, setModuleName] = useState("");
  const [updatemoduleName, setUpdateModuleName] = useState("");

  const getModules = async () => {
    const res = await axios.get(
      `http://localhost:8000/api/get/navigate/modules`
    );
    setModules(res.data.data);
  };
  const toggleSwitch = (index) => {
    const updatedToggleStates = [...toggleStates];
    updatedToggleStates[index] = !updatedToggleStates[index];
    setToggleStates(updatedToggleStates);
    const isChecked = updatedToggleStates[index];
    console.log(`Checkbox value for index ${index}: ${isChecked}`);

    const valuess = isChecked ? 1 : 0;
    console.log(valuess);
  };

  const handleButClick = () => {
    Navigate("/dashboard");
  };
  const handleModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setEditmodalIsOpen(false);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "55%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(moduleName);
    await axios
      .post(`http://localhost:8000/api/post/nav_module`, {
        module_name: moduleName,
      })
      .then((res) => {
        toast.success("Created Successfuly ", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Request Denied ", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(updatemoduleName);
  };
  // const keyValuePairs = Object.keys(modules).map(key => ({
  //   key: key,
  //   value: modules[key]
  // }));
  
  // console.log(keyValuePairs,"gggggggggg");
  useEffect(() => {
    getModules();
    // console.log(modules,"hhhhhhh")
  }, []);
  return (
    <>
      <div className="top">
        <div className="first-top">
          <h1>Navigations</h1>
          <div className="back_but">
            <button onClick={handleButClick}>Back</button>
          </div>
        </div>
        <div className="add_module">
          <button onClick={handleModal}>Add+</button>
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
                {modules.map((value, index) => (
                  <tr key={index}>
                    <th scope="row">{value.navigate_id}</th>
                    <td>{value.Modules}</td>
                    <td>
                      <div className="toggle-switch">
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={toggleStates[index] || false}
                            onChange={(e) => {
                              toggleSwitch(index);
                            }}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="buttons">
                        <div>
                          <Link>
                            <BiEdit
                              color="white"
                              size={20}
                              onClick={() => setEditmodalIsOpen(true)}
                            />
                          </Link>
                        </div>
                        <div>
                          <Link to={"/navigateheader"}>
                            <BiCommentEdit color="white" size={20} />
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
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <h4>Create New Module</h4>
        </div>
        <form className="Modal_form">
          <div className="main_cont">
            <div className="sec_child_input">
              <div className="input_lab">
                <h6>Module Name</h6>
              </div>
              <input
                type="text"
                name="name"
                className="input_select"
                onChange={(e) => {
                  setModuleName(e.target.value);
                }}
              />
            </div>
            <div className="third_child_input">
              <div className="first_but"></div>
              <button className="" onClick={closeModal}>
                close
              </button>
              <div className="sec_but">
                <button className="" onClick={handleSubmit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={editmodalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <h4>Update Module</h4>
        </div>
        <form className="Modal_form">
          <div className="main_cont">
            <div className="sec_child_input">
              <div className="input_lab">
                <h6>Module Name</h6>
              </div>
              <input
                type="text"
                name="name"
                className="input_select"
                onChange={(e) => {
                  setUpdateModuleName(e.target.value);
                }}
              />
            </div>
            <div className="third_child_input">
              <div className="first_but"></div>
              <button className="" onClick={closeModal}>
                close
              </button>
              <div className="sec_but">
                <button className="" onClick={handleUpdate}>
                  Updated Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default NavigationSystem;
