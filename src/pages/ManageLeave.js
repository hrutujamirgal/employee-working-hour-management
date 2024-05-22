import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Common from "../components/Common";

const ManageLeave = () => {
  const [data, setData] = useState([]);

  const auth = localStorage.getItem("user");
  const getname = JSON.parse(auth);

  const getLeave= async () => {
    try {
      let result = await fetch(
        `http://localhost:5000/getLeave/${getname.department}`
      );
      result = await result.json();

      console.log(getname.email);
      setData(result);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handleOnClick = async (leaveId) => {
    try {
      let result1 = await fetch(
        `http://localhost:5000/updateLeaveStatus/${leaveId}`,
        {
          method: "PUT",
        }
      );

      if (!result1.ok) {
        alert("Something went wrong");
      } else {
        // Update the UI to mark the task as complete
        setData((prevData) =>
          prevData.map((item) =>
            item._id === leaveId ? { ...item, status: "Approved" } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };


  const handleReject = async (leaveId) => {
    try {
      let result2 = await fetch(
        `http://localhost:5000/updateLeaveStatusReject/${leaveId}`,
        {
          method: "PUT",
        }
      );

      if (!result2.ok) {
        alert("Something went wrong");
      } else {
        // Update the UI to mark the task as complete
        setData((prevData) =>
          prevData.map((item) =>
            item._id === leaveId ? { ...item, status: "Rejected" } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  useEffect(() => {
    getLeave();
  }, []);

  return (
    <>
      <div className="main">
        <div className="admin-content">
          <div className="cont">
            <div className="row">
              <div className="col-md-10">
                <h1 className="admin-heading">ManageLeave Task</h1>
              </div>
              <div className="col-md-2">
                <Link className="add-new" to="/askLeave">
                  Ask For Leave
                </Link>
              </div>
              <div className="col-md-18">
                <table className="content-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Date For Leave</th>
                      <th>Type of Leave</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Accept</th>
                      <th>Reject</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(data) &&
                      data.map((item) => (
                        <tr key={item._id}>
                          <td>{item.employee}</td>
                          <td>{item.employeeDepartment}</td>
                          <td>{item.date}</td>
                          <td>{item.type}</td>
                          <td>{item.reason}</td>
                          <td>{item.status}</td>
                          <td className="complete">
                            <button onClick={() => handleOnClick(item._id)}>
                              <FontAwesomeIcon
                                icon="fa-solid fa-check-to-slot"
                                style={{ color: "#2de109" }}
                              />
                            </button>
                          </td>
                          <td className="reject">
                            <button onClick={() => handleReject(item._id)}>
                              <FontAwesomeIcon
                                icon="fa-solid fa-xmark"
                                style={{ color: "#f20707" }}
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

export default ManageLeave;
