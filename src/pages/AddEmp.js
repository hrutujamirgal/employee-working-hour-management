import React, { useState } from "react";
import Common from "../components/Common"
import { useNavigate } from "react-router-dom";

const AddEmp = () => {

    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      joiningDate: "",
      salary: "",
      employmentType: "",
      department: "",
      designation: "",
    });

    const [error, setError] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const history = useNavigate();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };


    const handleOnSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        let response = await fetch("http://localhost:5000/emp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Registration failed");
        }

        response = await response.json();

        setIsRegistered(true);
        alert("User registered successfully");

        history("/empdata");
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <>
      <div className="main">
        <div className="admin-content">
          <div className="container">
              <div className="col-md-12">
                <h1 className="admin-heading">Add Employee</h1>
              </div>
                {isRegistered && (
                  <div className="success-message">
                    Employee Data saved Successfully!
                  </div>
                )}

                {/* <!-- Form Start --> */}
                <form onSubmit={handleOnSubmit}>
                  <div className=" d1 ">
                    <div className="form-group">
                      <label> Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group ms-5">
                      <label>Email id</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className=" d1">
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group ms-5">
                      <label>Joining date</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Joining Date"
                        name="joiningDate"
                        value={formData.joiningDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className=" d1">
                    <div className="form-group">
                      <label>Salary</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group ms-5">
                      <label>Employment Type</label>
                      <select
                        className="form-control"
                        placeholder="Employment"
                        name="employmentType"
                        value={formData.employmentType}
                        onChange={handleChange}
                        required
                      >
                        <option value="" selected>
                          Select your Employment type
                        </option>
                        <option value="Permanent">Permanent</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Intern">Intern</option>
                      </select>
                    </div>
                  </div>

                  <div className="d1">
                    <div className="form-group">
                      <label>Designation</label>
                      <select
                        className="form-control"
                        placeholder="Designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        required
                      >
                        <option value="" selected>
                          Select your Designation
                        </option>
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                        <option value="Head Of Department">
                          Head Of Department
                        </option>
                      </select>
                    </div>

                    <div className="form-group ms-5">
                      <label>Department</label>
                      <select
                        className="form-control"
                        placeholder="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                      >
                        <option value="" selected>
                          Select your Department
                        </option>
                        <option value="Development">Development</option>

                        <option value="Quality Assurance">
                          Quality Assurance (QA) / Testing
                        </option>

                        <option value="IT Support">
                          IT Support / Helpdesk
                        </option>

                        <option value="Network and Infrastructure">
                          Network and Infrastructure
                        </option>

                        <option value="Project Management">
                          Project Management
                        </option>

                        <option value="Sales and Marketing">
                          Sales and Marketing
                        </option>

                        <option value="Human Resources">
                          Human Resources (HR)
                        </option>

                        <option value="Finance and Accounting">
                          Finance and Accounting
                        </option>

                        <option value="Research and Development">
                          Research and Development (R&D)
                        </option>
                      </select>
                    </div>
                  </div>

                  {error && <div className="error">{error}</div>}

                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                </form>

                {/* <!-- Form End--> */}
          </div>
        </div>

        <div className="side">
          <Common />
        </div>
      </div>
    </>
  );
}

export default AddEmp
