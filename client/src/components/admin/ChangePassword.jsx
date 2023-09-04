import "./Style/Home.css";
import React, { useState } from "react";
import "./Style/LoginPage.css";
import { set, useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MoonLoader from "react-spinners/MoonLoader";

function ChangePassword() {
  const { id } = useParams();
  const Navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    Password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const {register,formState: { errors },handleSubmit} = useForm();

  const handlePassword = async (e) => {
    e.preventDefault();
    try {
      console.log(values);
      const res = axios
        .put(`http://localhost:8000/api/update/password/${id}`, values).then((res) => setValues(res))
        .then((res) => {toast.success("Updated Successfuly ", {position: toast.POSITION.TOP_RIGHT})})
        .then((res) => setLoading(true))
        .then(() =>setTimeout(() => {setLoading(false);
            Navigate("/useraccount")}, 2000))
        .catch((err) => {toast.error("Something went wrong ", {position: toast.POSITION.TOP_RIGHT});
        });
    } catch (error) {console.log(error)}
  };

  return (
    <>
      <div className="d-flex homeie">
        <div className="content container mt-3 ms-10">
          <div className="slide-form">
            <div className="slideinput formTable">
              {loading ? (
                <MoonLoader color="#0feba9" className="MoonLoader" />
              ) : (
                <>
                  <form
                    encType="multipart/form-data password_form"
                    onSubmit={handleSubmit()}
                  >
                    <div className="inp-cont ">
                      <div className="lab-cont">
                        <label className="form-lable">
                          old-Password<span className="textdanger">*</span>
                        </label>
                      </div>
                      <input
                        type="password"
                        name="Password"
                        {...register("Password", {
                          required: true,
                          minLength: 6,
                          maxLength: 20,
                        })}
                        className="form-control"
                        onChange={(e) =>
                          setValues({ ...values, Password: e.target.value })
                        }
                      />
                      <span className="textdanger">
                        {errors.Password?.type === "required" &&
                          "password is required"}
                        {errors.Password?.type === "minLength" &&
                          "password is too short"}
                        {errors.Password?.type === "maxLength" &&
                          "password is too long"}
                      </span>
                    </div>
                    <div className="inp-cont ">
                      <div className="lab-cont">
                        <label className="form-lable">
                          New-Password<span className="textdanger">*</span>
                        </label>
                      </div>

                      <input
                        type="password"
                        name="newPassword"
                        {...register("newPassword", {
                          required: true,
                          minLength: 6,
                          maxLength: 20,
                        })}
                        className="form-control"
                        onChange={(e) =>
                          setValues({ ...values, newPassword: e.target.value })
                        }
                      />
                      <span className="textdanger">
                        {errors.newPassword?.type === "required" &&
                          "password is required"}
                        {errors.newPassword?.type === "minLength" &&
                          "password is too short"}
                        {errors.newPassword?.type === "maxLength" &&
                          "password is too long"}
                      </span>
                    </div>
                    <div className="inp-cont">
                      <div className="lab-cont">
                        <label className="form-lable">
                          Confirm-Password<span className="textdanger">*</span>
                        </label>
                      </div>

                      <input
                        type="password"
                        name="confirmPassword"
                        {...register("confirmPassword", {
                          required: true,
                          minLength: 6,
                          maxLength: 20,
                        })}
                        className="form-control"
                        onChange={(e) =>
                          setValues({
                            ...values,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                      <span className="textdanger">
                        {errors.confirmPassword?.type === "required" &&
                          "password is required"}
                        {errors.confirmPassword?.type === "minLength" &&
                          "password is too short"}
                        {errors.confirmPassword?.type === "maxLength" &&
                          "password is too long"}
                        {errors.confirmPassword?.type === "newPassword" &&
                          "Passwords do not match"}
                      </span>
                    </div>
                    {/* <div className="button-cont"> */}
                    <div className="inp-cont">
                      <button
                        className=" btn btn-success"
                        onClick={handlePassword}
                      >
                        Submit
                      </button>
                    </div>
                    <div className="inp-cont">
                      <Link className=" btn btn-danger" to={"/useraccount"}>
                        Cancel
                      </Link>
                    </div>
                    {/* </div> */}
                  </form>
                </>
              )}
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
