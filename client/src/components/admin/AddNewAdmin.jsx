import React, { useState } from "react";
import "./Style/LoginPage.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddNewAdmin() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const Navigate = useNavigate();

  const onSubmit = async (err, data) => {
    // e.preventDefault();
    console.log(data);
    await axios
      .post("http://localhost:8000/api/register", values)
      .then((res) => {
        console.log(res);
        setValues(res);
      })
      .then((res) => Navigate("/userlist"))
      .then((res) => localStorage.clear())
      .catch((err) => console.log(err));
  };
  return (
    <>
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
                    className="form-control"
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                    {...register("name", {
                      required: true,
                    })}
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
                  <label htmlFor="role">Choose:</label>

                  <select
                    name="role"
                    id=""
                    onChange={(e) =>
                      setValues({ ...values, role: e.target.value })
                    }
                  >
                    <option value="user">user</option>
                    <option value="admin">Admin</option>
                    <option value="admin">Editor</option>
                  </select>
                </div>
                <div className="inp-cont">
                  <button className=" btn btn-success">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default AddNewAdmin;
