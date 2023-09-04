import React, { useState } from "react";
import "./Style/Home.css";

function Settings() {
  const [values, setValues] = useState({
    email: "",
    address: "",
    websiteName: "",
    mobile: "",
    fb: "",
    insta: "",
    linkedin: "",
    twitter: "",
  });

  return (
    <div className="homeie">
      Settings
      <div className="set-container">
        <div>
          <h3>General Website Settings</h3>
        </div>
        <form className="input-cont" enctype="multipart/form-data">
          <div className="row_input row">
            <div className="col">
              <label>Email -</label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Email"
                aria-label="Email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="col">
              <label>Address -</label>
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="Address"
                aria-label="Address"
                onChange={(e) =>
                  setValues({ ...values, address: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row_input row">
            <div className="col">
              <label>Website name -</label>
              <input
                type="text"
                name="websiteName"
                className="form-control"
                placeholder="Website name"
                aria-label="Website name"
                onChange={(e) =>
                  setValues({ ...values, websiteName: e.target.value })
                }
              />
            </div>
            <div className="col">
              <label>Contact number -</label>
              <input
                type="number"
                name="mobile"
                className="form-control"
                placeholder="Contact number"
                aria-label="AdContact numberdress"
                onChange={(e) =>
                  setValues({ ...values, mobile: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row_input row">
            <div className="col">
              <label>fb -</label>
              <input
                type="text"
                name="fb"
                className="form-control"
                placeholder="fb"
                aria-label="fb"
                onChange={(e) => setValues({ ...values, fb: e.target.value })}
              />
            </div>
            <div className="col">
              <label>insta -</label>
              <input
                type="text"
                name="insta"
                className="form-control"
                placeholder="insta"
                aria-label="insta"
                onChange={(e) =>
                  setValues({ ...values, insta: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row_input row">
            <div className="col">
              <label>LinkedIn -</label>
              <input
                type="text"
                name="linkedin"
                className="form-control"
                placeholder="LinkedIn"
                aria-label="LinkedIn"
                onChange={(e) =>
                  setValues({ ...values, linkedin: e.target.value })
                }
              />
            </div>
            <div className="col">
              <label>twitter -</label>
              <input
                type="text"
                name="twitter"
                className="form-control"
                placeholder="twitter"
                aria-label="twitter"
                onChange={(e) =>
                  setValues({ ...values, twitter: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row_input row">
            <div className="col">
              <label>Website Logo -</label>
              <input type="File" name="logo" className="form-control" />
            </div>
            <div className="col">
              <label>Fav Icon -</label>
              <input type="File" name="logo" className="form-control" />
            </div>
          </div>
        </form>
        <button>submit</button>
      </div>
    </div>
  );
}

export default Settings;
