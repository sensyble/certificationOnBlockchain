import React, { useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Register = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    institute_id: "",
    email: "",
    password: "",
    confirm_password: "",
    institute_role: "Institute Admin",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkValidation = () => {
    // Validation: Check if required fields are not empty
    if (
      !inputs.name ||
      !inputs.username ||
      !inputs.institute_id ||
      !inputs.email ||
      !inputs.password ||
      !inputs.confirm_password ||
      !inputs.institute_role
    ) {
      alert("Please fill in all required fields");
      return; // Stop form submission if validation fails
    }

    // Check if password and confirm password match
    if (inputs.password !== inputs.confirm_password) {
      alert("Both Password does not match");
      return;
    }
  };

  const sendRequest = async()=>{
    try {
      const res = await axios.post("http://localhost:4000/api/register", {
        name: inputs.name,
        username: inputs.username,
        email: inputs.email,
        institute_id: inputs.institute_id,
        confirm_password: inputs.confirm_password,
        password: inputs.password,
        institute_role: inputs.institute_role,
      })
      const userData = await res.data.message;
      return userData;
    } catch (error) {
      console.log("Error while sending data to backend", error.message);
    }

  }


  const handleSubmit = async(e) => {
    e.preventDefault();

    // check validation function to check All the feilds must be filled and password and confirm password must be same
    checkValidation();

    sendRequest().then(()=>navigate("/login"))
    

    
    };
    

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   // check validation function to check All the fields must be filled and password and confirm password must be the same
  //   checkValidation();
  
  //   //   const res = await axios.post("http://localhost:3000/api/signup", {
  //   //     name: inputs.name,
  //   //     username: inputs.username,
  //   //     email: inputs.email,
  //   //     institute_id: inputs.institute_id,
  //   //     confirm_password: inputs.confirm_password,
  //   //     password: inputs.password,
  //   //     institute_role: inputs.institute_role,
  //   //   });
  
  //   //   console.log(res.data);
  
  //   //   const userData = await res.data.message;
  //   //   return userData;
  //   // } catch (error) {
  //   //   console.log("Error while sending data to backend", error.message);
  //   // }
  
  //   // navigate("/login");
  // };
  
;

  return (
    <div>
      <h3>University Form</h3>
      <div className="university-form mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <form
                className="form-out border rounded p-4"
                onSubmit={handleSubmit}
              >
                <div className="form-group mb-3">
                  <label htmlFor="universityName">Institute Name: </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="University Name"
                    name="name"
                    onChange={handleInputChange}
                    value={inputs.name}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="universityId">Institute Id: </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="University ID"
                    name="institute_id"
                    onChange={handleInputChange}
                    value={inputs.institute_id}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="universityId">Username: </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="University ID"
                    name="username"
                    onChange={handleInputChange}
                    value={inputs.username}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="inputEmail">Email: </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="University Email"
                    name="email"
                    onChange={handleInputChange}
                    value={inputs.email}
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
                    value={inputs.password}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="inputCPassword">Confirm Password: </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="confirm_password"
                    onChange={handleInputChange}
                    value={inputs.confirm_password}
                  />
                </div>

                <div className="input-group mb-3">
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
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Register;
