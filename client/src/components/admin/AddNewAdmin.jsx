import React, { useState } from "react";
import "./Style/LoginPage.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddNewAdmin() {
  const Navigate = useNavigate();
  const [values, setValues] = useState({name: "",email: "",password: "",role: ""});
  const {register,formState: { errors },handleSubmit,watch} = useForm();

  const onSubmit = async (err, data) => {await axios.post("http://localhost:8000/api/register", values)
      .then((res) => {
        if (res.data.message === "already Exists") {
          console.log("alredy exist");
          toast.error("user already exist!", {position: toast.POSITION.TOP_RIGHT});
        } else {
          toast.success("user resgister!", {position: toast.POSITION.TOP_RIGHT});
          setValues(res);
          Navigate("/userlist");
        }
      }).catch((err) => console.log(err));
  };
  return (
    <>
      <div className="bodyDiv">
        <div className="Form-cont">
          <div className="logo">
            <h1>Register Page</h1>
          </div>
          <div className="input-container">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="inp-cont">
                <label className="form-lable">
                  Name<span className="textdanger">*</span>
                </label>
                <input
                  type="name"
                  name="name"
                  {...register("name", {
                    required: true,
                  })}
                  className="form-control"
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                />
                <span className="textdanger">
                  {errors.name?.type === "required" && "name is required"}
                </span>
                <label className="form-lable">
                  Email<span className="textdanger">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                  })}
                  className="form-control"
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
                <span className="textdanger">
                  {errors.email?.type === "required" && "email is required"}
                  {errors.email?.type === "required " &&
                    "email format is wrong"}
                </span>
              </div>
              <div className="inp-cont">
                <label className="form-lable">
                  Password<span className="textdanger">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                  })}
                  className="form-control"
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                />

                <span className="textdanger">
                  {errors.password?.type === "required" &&
                    "password is required"}
                  {errors.password?.type === "minLength" &&
                    "password is too short"}
                  {errors.password?.type === "maxLength" &&
                    "password is too long"}
                </span>
              </div>
              <div className="inp-cont">
                <label>
                  Confirm Password<span className="textdanger">*</span>
                </label>
                <input
                  type="password"
                  name="Confirmpassword"
                  {...register("Confirmpassword", {
                    required: true,
                    validate: (value) => value === watch("password"),
                    minLength: 6,
                    maxLength: 20,
                  })}
                  className="form-control"
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                />
                <span className="textdanger">
                  {errors.Confirmpassword?.type === "required" &&
                    "password is required"}
                  {errors.Confirmpassword?.type === "minLength" &&
                    "password is too short"}
                  {errors.Confirmpassword?.type === "maxLength" &&
                    "password is too long"}
                  {errors.Confirmpasswords?.type === "password" &&
                    "Passwords do not match"}
                </span>
              </div>
              <div className="inp-cont">
                <button className=" btn btn-success">Submit</button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNewAdmin;
