import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import Common from "../components/Common";

const EmpData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = async () => {
    let result = await fetch("http://localhost:5000/emp");
    result = await result.json();

    setData(result);
  };

  const navigate = useNavigate();

  const handleEdit = async (empId) =>{
    localStorage.setItem("editId", empId);
    navigate("/edit");
  }

  const handleView = async(empId, empMail)=>{
    const emp = [empId, empMail];
    localStorage.setItem("view", JSON.stringify(emp));
    navigate("/view");
  }

  // Function to handle employee deletion
  const handleDelete = async (employeeId) => {
    try {
      const response = await fetch("http://localhost:5000/deleteEmp ", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeId }), // Send the employeeId in the request body
      });

      console.log("Deleting employee with ID:", employeeId);


      if (response.ok) {
        const updatedData = data.filter((item) => item._id !== employeeId);
        setData(updatedData);

        alert("Employee deleted successfully");
      } else {
        alert("Failed to delete employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };


  return (
    <>
      <div className="main">
        <div className="admin-content">
          <div className="cont">
            <div className="row">
              <div className="col-md-10">
                <h1 className="admin-heading">Employee Data</h1>
              </div>
              <div className="col-md-2">
                <Link className="add-new" to="/addEmp">
                  Add Employee
                </Link>
              </div>
              <div className="col-md-18">
                <table className="content-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Salary</th>
                      <th>Joining Date</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th>View</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.salary}</td>
                        <td>{item.joiningDate}</td>
                        <td>{item.department}</td>
                        <td>{item.designation}</td>
                        <td className="view">
                          <button onClick={() => handleView(item._id, item.email)}>
                            <FontAwesomeIcon
                              icon="fa-solid fa-eye"
                              style={{ color: "#56c6f5" }}
                            />
                          </button>
                        </td>
                        <td className="edit">
                          <button onClick={() => handleEdit(item._id)}>
                            <FontAwesomeIcon
                              icon="fa-solid fa-pen-to-square"
                              style={{ color: "#0ed81b" }}
                            />
                          </button>
                        </td>
                        <td className="delete">
                          <button onClick={() => handleDelete(item._id)}>
                            <FontAwesomeIcon
                              icon="fa-solid fa-trash-can"
                              style={{ color: "#ea0b0b" }}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="side">
          <Common />
        </div>
      </div>
    </>
  );
};

export default EmpData;

