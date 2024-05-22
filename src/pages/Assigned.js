import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import Common from "../components/Common";

const Assigned = () => {
  const [data, setData] = useState([]);

  const auth = localStorage.getItem("user");
  let getEmail = JSON.parse(auth);

  const navigate = useNavigate();

  const getAssigned = async () => {
    try {
      let result = await fetch(
        `http://localhost:5000/getTaskMy/${getEmail.email}`
      );
      result = await result.json();

      console.log(getEmail.email);
      console.log(result); // Log the fetched data
      setData(result);
      console.log(data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };



  useEffect(() => {
    getAssigned();
  },[]);

  const handleUpdateTask = (taskId) => {
    localStorage.setItem("updateTaskId", taskId);
    navigate("/updateTask");
  };


  const handleDeleteTask = async(taskId) => {

    const deleteTask = fetch("http://localhost:5000/deleteTask", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId }), // Send the employeeId in the request body
      });

      if (deleteTask.acknowledge === true) {
        const updatedData = data.filter((item) => item._id !== taskId);
        setData(updatedData);

        alert("Task deleted successfully");
      } else {
        alert("Failed to delete Task");
      }
  };

  return (
    <>
      <div className="main">
        <div className="admin-content">
          <div className="cont">
            <div className="row">
              <div className="col-md-10">
                <h1 className="admin-heading">Task Assigned By Me</h1>
              </div>
              <div className="col-md-2">
                <Link className="add-new" to="/AssignTask">
                  Assign Task
                </Link>
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
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item._id}>
                        <td>{item.to}</td>
                        <td>{item.from}</td>
                        <td>{item.task}</td>
                        <td>{item.description}</td>
                        <td>{item.status}</td>
                        <td className="edit">
                          <button onClick={() => handleUpdateTask(item._id)}>
                            <FontAwesomeIcon
                              icon="fa-solid fa-pen-to-square"
                              style={{ color: "#0ed81b" }}
                            />
                          </button>
                        </td>
                        <td className="delete">
                          <button onClick={() => handleDeleteTask(item._id)}>
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

export default Assigned;
