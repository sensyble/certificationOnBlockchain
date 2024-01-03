import { useState } from "react";

const AddUser = () => {
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    status: "",
    role: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkValidation = () => {
    // Validation: Check if required fields are not empty
    if (
      !userInput.username ||
      !userInput.email ||
      // !userInput.status ||
      !userInput.role
    ) {
      alert("Please fill in all required fields");
      return false; // Stop form submission if validation fails
    }

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("hello")

    if (!checkValidation()) {
      return false;
    }

    console.log(userInput);
  };

  const handleFormPopup = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleFormPopup}>
        Add User
      </button>
      {showForm && (
        <div className="university-form mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <form
                  className="form-out border rounded p-4"
                  onSubmit={handleSubmit}>

                  <div className="form-group mb-3">
                    <label htmlFor="universityId">Username: </label>
                    <input type="text" className="form-control" placeholder="Username" name="username" onChange={handleInputChange} value={userInput.username} />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="universityId">Email:  </label>
                    <input type="email" className="form-control" placeholder="Email Id" name="email" onChange={handleInputChange} value={userInput.email} />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="status">Status: </label>
                    <div className="form-check">
                      <label htmlFor="flexRadioDefaultActive" className="form-check-label me-5">Active</label>
                      <input
                        type="radio"
                        id="flexRadioDefaultActive"
                        name="status"
                        value="Active"
                        checked={userInput.status === "Active"}
                        onChange={handleInputChange}
                        className="form-check-input me-1"
                      />

                      <label htmlFor="flexRadioDefaultInactive" className="form-check-label">Inactive</label>
                      <input
                        type="radio"
                        id="flexRadioDefaultInactive"
                        name="status"  
                        value="Inactive"
                        checked={userInput.status === "Inactive"}
                        onChange={handleInputChange}
                        className="form-check-input me-1"
                      />
                    </div>
                  </div>



                  <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Institute Role</label>
                    <select className="form-select" id="inputGroupSelect01" name="role" value={userInput.role} onChange={handleInputChange}>
                      <option value="Data Manager">Data Manager</option>
                      <option value="Certifier">Certifier</option>
                    </select>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Create User</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;
