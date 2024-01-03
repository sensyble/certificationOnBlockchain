import React, { useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authAction } from "../store";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLoginInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkValidation = () => {
    // Validation: Check if required fields are not empty
    if (!loginInputs.email || !loginInputs.password) {
      alert("Please fill in all required fields");
      return; // Stop form submission if validation fails
    }

    return true
  };

  const sendRequest = async()=>{
    try {
        const res = await axios.post("http://localhost:4000/api/login", {
          email: loginInputs.email,
          password: loginInputs.password,
        });
        const userData = await res.data.message;
        return userData;
      } catch (error) {
        console.log("Error while sending data to backend", error.message);
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check validation function to check All the feilds must be filled and password and confirm password must be same
    if(!checkValidation()){
      return
    }

    sendRequest().then(()=>dispatch(authAction.login())).then(()=>navigate("/dashboard"))

  };

  return (
    <div>
      <h3>Login</h3>
      <div className="university-form mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <form
                className="form-out border rounded p-4"
                onSubmit={handleSubmit}
              >
                <div className="form-group mb-3">
                  <label htmlFor="inputEmail">Email: </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="University Email"
                    name="email"
                    onChange={handleInputChange}
                    value={loginInputs.email}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="inputPassword">Password: </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    name="password"
                    onChange={handleInputChange}
                    value={loginInputs.password}
                  />
                </div>

                {/* <div className="input-group mb-3">
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupSelect01"
                  >
                    Institute Role
                  </label>
                  <select
                    className="form-select"
                    id="inputGroupSelect01"
                    name="institute_role"
                    value={inputs.institute_role}
                    onChange={handleInputChange}
                  >
                    <option value={"Institute Admin"}>Institute Admin</option>
                    <option value="Data Manager" disabled>
                      Data Manager
                    </option>
                    <option value="Certifier" disabled>
                      Certifier
                    </option>
                  </select>
                </div> */}

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
