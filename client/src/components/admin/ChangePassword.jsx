import "./Style/Home.css";
import React, { useState } from "react";
import "./Style/LoginPage.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotAuth from "../NotAuth";

function ChangePassword() {
  const { id } = useParams();
  console.log(id)
  const Navigate = useNavigate();

  const [values, setValues] = useState({
    Password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  return (
    <>
      <div className="d-flex homeie">
        <div className="content container mt-3 ms-10">
          <div className="slide-form">
            <div className="slideinput formTable">
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
                      setValues({ ...values, confirmPassword: e.target.value })
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
                <div className="inp-cont">
                  <button className=" btn btn-success">Submit</button>
                  <ToastContainer />
                </div>
                <div className="inp-cont">
                  <Link className=" btn btn-danger" to={"/useraccount"}>Cancel</Link>
       
                </div> 
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
