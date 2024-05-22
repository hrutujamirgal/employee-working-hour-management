import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Common from "../components/Common";

const AssignedEmp = () => {
  const [data, setData] = useState([]);

  const auth = localStorage.getItem("user");
  const getname = JSON.parse(auth);

  useEffect(() => {
    getTask();
  });

  const getTask = async () => {
    try {
      let result = await fetch(
        `http://localhost:5000/getEmpTask/${getname.email}`
      );
      result = await result.json();

      console.log(getname.email);
      setData(result);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };


  const handleOnClick = async (taskId) => {
    try {
      let result1 = await fetch(`http://localhost:5000/updateTaskStatus/${taskId}`, {
        method: "PUT",
      });

      if (!result1.ok) {
        alert("Something went wrong");
      } else {
        // Update the UI to mark the task as complete
        setData((prevData) =>
          prevData.map((item) =>
            item._id === taskId ? { ...item, status: "Completed" } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  


  return (
    <>
      <div className="main">
        <div className="admin-content">
          <div className="cont">
            <div className="row">
              <div className="col-md-10">
                <h1 className="admin-heading">Assigned Emp Task</h1>
              </div>
              <div className="col-md-2">
               {getname.designation !== "Employee" &&  <Link className="add-new" to="/AssignTask">
                  Assign Task
                </Link> }
              </div>
              <div className="col-md-18">
                <table className="content-table">
                  <thead>
                    <tr>
                      <th>To</th>
                      <th>From</th>
                      <th>Task</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Complete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(data) &&
                      data.map((item) => (
                        <tr key={item._id}>
                          <td>{item.to}</td>
                          <td>{item.from}</td>
                          <td>{item.task}</td>
                          <td>{item.description}</td>
                          <td>{item.status}</td>
                          <td className="complete">
                            <button onClick={() => handleOnClick(item._id)}>
                              <FontAwesomeIcon
                                icon="fa-solid fa-check-to-slot"
                                style={{ color: "#2de109" }}
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

export default AssignedEmp;
