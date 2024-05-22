import React, { useEffect, useState } from "react";
import Common from "../components/Common";

const View = () => {
  const [data, setData] = useState("");
  const [date, setDate] = useState({
    date: "",
    loginTime: "",
    logoutTime: "",
  });
  const [datePart, setDatePart] = useState("");
  const [Tdate, setTdate] = useState("");
  const [task, setTask] = useState([]);

  const auth = localStorage.getItem("view");
  const getName = JSON.parse(auth);

  
  useEffect(() => {
    getEMP();
    getDate();
    getTask();
  }, []);

  const getEMP = async () => {
    try {
      const result = await fetch(
        `http://localhost:5000/profile/${getName[0]}`
      );
      if (result.ok) {
        const data1 = await result.json();
        setData(data1[0]);

        if (data1[0].joiningDate) {
          const fullDateTime = data1[0].joiningDate;
          const datePart = fullDateTime.split("T")[0];
          setDatePart(datePart);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDate = async () => {
    try {
      const result1 = await fetch(
        `http://localhost:5000/profileDate/${getName[1]}`
      );
      if (result1.ok) {
        const data = await result1.json();
        console.log(data);
        setDate(data);

        if (data.date) {
          const fullDateTime = data.date;
          const datePart = fullDateTime.split("T")[0];
          setTdate(datePart);
        }
      } 
    } catch (error) {
      // Handle network or parsing errors
      console.error(error);
    }
  };

  const getTask = async () => {
    try {
      const result2 = await fetch(
        `http://localhost:5000/getEmpTask/${getName[1]}`
      );
      if (result2.ok) {
        const data = await result2.json();
        setTask(data);
      } 
    } catch (error) {
      // Handle network or parsing errors
      console.error(error);
    }
  };

  return (
    <div>
      <div className="main">
        <div className="pro">
          <h1 className="h1">{data.name}</h1>
          <div className="body ">
            <div className="details ">
              <div className="department ">Department: {data.department}</div>
              <div className="designation ">
                Designation: {data.designation}
              </div>
            </div>

            <div className="personal ">
              <div className="joiningDate">Joining Date: {datePart}</div>
              <div className="salary">Salary: {data.salary} per annum</div>
            </div>
          </div>

          <div className="line"></div>
          <br />
          <br />

          <div className="today">
            <span className="dateT">Date: {Tdate}</span>
            <span className="loginT">Login time: {date.login}</span>
            <span className="logoutT">
              Logout time: {date.logout < date.login ? "Active" : date.logout}
            </span>
          </div>

          <br />
          <br />

          <div className="projects">
            <p className="h3">Tasks</p>
            <div className="admin-content">
              <div className=" col-md-18">
                <table className="content-table">
                  <thead>
                    <tr>
                      <th>Task Assigned</th>
                      <th>Task Assigned By</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {task.map((item) => (
                      <tr key={item._id}>
                        <td>{item.description}</td>
                        <td>{item.from}</td>
                        <td>{item.status}</td>
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
    </div>
  );
};

export default View;
