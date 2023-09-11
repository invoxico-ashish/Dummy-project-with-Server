import React, { useEffect, useState } from "react";
import "./Style/Home.css";
import { BiEdit } from "react-icons/bi";
import { MdDeleteSweep } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function NavigateFooter() {
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();
  const [foo_module, setFoo_modules] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [footer_nav_id, setFooter_nav_id] = useState("");
  const [foo_link_title, setFoo_link_title] = useState("");
  const [foo_link_target, setFoo_link_target] = useState("");
  const [foo_link_display_order, setFoo_link_display_order] = useState("");
  const [foo_link_LINKS, setFoo_link_LINKS] = useState("");
  const [singleData, setSingleData] = useState([]);
  console.log(footer_nav_id, "id");

  const footer_modules = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/get/footer_modules`
    );
    setFoo_modules(response.data.result);
    console.log(response.data.result, "resssss");
  };
  const handleclick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("footer_nav_id", footer_nav_id);
    formData.append("foo_link_title", foo_link_title);
    formData.append("foo_link_target", foo_link_target);
    formData.append("foo_link_display_order", foo_link_display_order);
    formData.append("foo_link_LINKS", foo_link_LINKS);
    const formDataObject = Object.fromEntries(formData.entries());
    console.log(formDataObject);
    // return false;s
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        `http://localhost:8000/api/post/footer_module`,
        formDataObject,
        config
      )
      .then((res) => {
        toast.success("Updated Successfuly ", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Request Denied ", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleDelete = (id) => {
    console.log(`the ${id} deleted`);
    axios
      .put(
        `http://localhost:8000/api/delete/footer_module/status/deleted/${id}`
      )
      .then((res) => {
        toast.success("Deleted Successfuly ", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Request Denied ", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const Foot_single = async (id) => {
    console.log(footer_nav_id, "dkiough  ");
    const res = await axios
      .get(
        `http://localhost:8000/api/get/footer_modules/single/${id}`
      )
      .then((res) => {
        console.log(res);
        setSingleData(res.data.result[0]);
        setFoo_link_title(res.data.result[0]);
        setFoo_link_target(res.data.result[0]);
        setFoo_link_display_order(res.data.result[0]);
        setFoo_link_LINKS(res.data.result[0]);
        console.log(singleData, "singleData");
      });
    console.log(res, "res");
  };
  useEffect(() => {
    footer_modules();
 
  }, []);
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
        <div className="first-top">
          <h5>Navigation Page Listing</h5>
          <div className="back_but">
            <button
              onClick={() => {
                Navigate("/navigation");
              }}
            >
              Back
            </button>
          </div>
        </div>

        <div className="main-cont">
          <div className="navigate-home">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {foo_module.map((value) => (
                  <tr>
                    <th scope="row">{value.footer_nav_id}</th>
                    <td>{value.foo_link_title}</td>
                    <td>
                      <div className="buttons">
                        <div className="logoo">
                          <Link>
                            <BiEdit
                              color="white"
                              size={20}
                              onClick={() => {
                                setIsOpen(true);
                                setFooter_nav_id(value.footer_nav_id);
                                Foot_single(value.footer_nav_id)
                              }}
                            />
                          </Link>
                        </div>
                        <div className="logoo">
                          <Link>
                            <MdDeleteSweep
                              color="white"
                              size={20}
                              onClick={() => handleDelete(value.footer_nav_id)}
                            />
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
        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          // onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <form className="Modal_form">
            <div className="main_cont">
              <div className="sec_child_input">
                <div className="input_lab">
                  <h6>Module Name</h6>
                </div>
                <input
                  type="text"
                  className="input_select"
                  value={foo_link_title.foo_link_title}
                  onChange={(e) => {
                    setFoo_link_title(e.target.value);
                  }}
                />
              </div>
              <div className="first_child_input">
                <div className="input_lab">
                  <h6>Link Target</h6>
                </div>

                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="select_link"
                  onChange={(e) => {
                    setFoo_link_target(e.target.value);
                  }}
                >
                  <option selected>Select</option>
                  <option
                    value="_self"
                    selected={
                      foo_link_target.foo_link_target === "_self"
                        ? "selected"
                        : ""
                    }
                  >
                    Current window
                  </option>
                  <option
                    value="_blank"
                    selected={
                      foo_link_target.foo_link_target === "_blank"
                        ? "selected"
                        : ""
                    }
                  >
                    Another Window
                  </option>
                </select>
              </div>
              <div className="sec_child_input">
                <div className="input_lab">
                  <h6>Display Order</h6>
                </div>
                <input
                  type="text"
                  value={foo_link_display_order.foo_link_display_order}
                  className="input_select"
                  onChange={(e) => {
                    setFoo_link_display_order(e.target.value);
                  }}
                />
              </div>
              <div className="sec_child_input">
                <div className="input_lab">
                  <h6>URL or LINK</h6>
                </div>
                <input
                  type="text"
                  className="input_select"
                  value={foo_link_LINKS.foo_link_LINKS}
                  onChange={(e) => {
                    setFoo_link_LINKS(e.target.value);
                  }}
                />
              </div>
              <div className="third_child_input">
                <div className="first_but"></div>
                <button className="" onClick={() => setIsOpen(false)}>
                  close
                </button>
                <div className="sec_but">
                  <button className="" onClick={handleclick}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal>
        <ToastContainer />
      </div>
    </>
  );
}

export default NavigateFooter;
