import React, { useEffect, useState } from "react";
import Common from "../components/Common";

const AskLeave = () => {


  const [formData, setFormData] = useState({
    employee: "",
    employeeDepartment: "",
    date: "",
    noOfDays: "",
    type: "",
    reason: "",
  });

  const auth = localStorage.getItem("user");
  const person = JSON.parse(auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      employee: person.email,
      employeeDepartment: person.department,
    });
  };

  

  const [status, setStatus] = useState("Not Approved");
  let leaveId = "";


  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/getLeaveStatus/${leaveId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        let stat = await response.json(); 
        setStatus(stat.status);
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/askleave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to assign: ${response.status} ${response.statusText}`
        );
      }

      const newLeave = await response.json();
      leaveId = newLeave._id;

      if (newLeave && newLeave.error) {
        throw new Error(`Failed to assign: ${newLeave.error}`);
      }

      alert("Leave Applied successfully");
      
    } catch (error) {
      alert("Error:", error);
    }
  };

  return (
    <>
      <div className="main">
        <div className="ask">
          <p className="head">Ask For Leave</p>
          <form onSubmit={handleSubmit} className="leave">
            <div className="date">
              <label htmlFor="date">Date for Leave</label>
              <input
                type="date"
                name="date"
                placeholder="Date for Leave"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="date">
              <label htmlFor="date">No of Leave</label>
              <input
                type="number"
                name="noOfDays"
                placeholder="No of Leave"
                value={formData.noOfDays}
                onChange={handleChange}
              />
            </div>
            <div className="typeL">
              <label htmlFor="type">Type of leave</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="" selected>
                  Select your leave type
                </option>
                <option value="FullDay">Full Day</option>
                <option value="HalfDay">Half Day</option>
              </select>
            </div>
            <div className="reason">
              Reason for Leave
              <br />
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                id="reason"
                cols="35"
                rows="4"
              ></textarea>
            </div>

            <input type="submit" name="Submit" className="askL" />
          </form>
          <div>Status of Leave: {status}</div>
        </div>

        <div className="side">
          <Common />
        </div>
      </div>
    </>
  );
};

export default AskLeave;
