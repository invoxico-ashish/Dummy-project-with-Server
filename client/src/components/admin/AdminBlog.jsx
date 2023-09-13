import React, { useState, useEffect } from "react";
import "./Style/Home.css";
import axios from "axios";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import { BiEdit, BiCommentEdit } from "react-icons/bi";

function AdminBlog() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModel = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };
  const handleClick = (e) => {
    const isChecked = e.target.checked;
    isChecked ? console.log(e.target.checked) : console.log("0");
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

  return (
    <>
      <div className="top">
        <div className="parent_div">
          <div className="child_div">
            <div className="top-section">
              <h5>Blog System</h5>
              <div>
                <Link>
                  <BsPlusCircleFill
                    size={30}
                    color="#49bfaf"
                    onClick={openModal}
                  />
                </Link>
              </div>
            </div>
            <div className="content-table">
              <table className="table table-striped table-dark blog_tble">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Test</td>
                    <td>
                      <div className="form-check form-switch switch_inp">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          value="isChecked"
                          onChange={(e) => {
                            handleClick(e);
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="buttons">
                        <div>
                          <Link>
                            <BiEdit color="white" size={20} />
                          </Link>
                        </div>

                        <div>
                          <Link>
                            <BiCommentEdit color="white" size={20} />
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <h4>Create New Blog</h4>
        </div>
        <form className="Modal_form">
          <div className="main_cont">
            <div className="sec_child_input">
              <div className="input_lab">
                <h6>Module Name</h6>
              </div>
              <input type="text" name="name" className="input_select" />
            </div>
            <div className="third_child_input">
              <div className="first_but"></div>
              <button className="" onClick={closeModel}>
                close
              </button>
              <div className="sec_but">
                <button className="">Save Changes</button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default AdminBlog;
