import React, { useEffect, useState } from "react";
import Common from "../components/Common";
import { useNavigate } from "react-router-dom";

const UpdateTask = () => {
  const [assign, setAssign] = useState({
    to: "",
    from: "",
    task: "",
    description: "",
  });

  const id = localStorage.getItem("updateTaskId");
  

  useEffect(()=>{
    getTask();
  }, []);

  console.log(id);

  const getTask = async () => {
    try {
      const result = await fetch(`http://localhost:5000/getTask/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        const resultAns = await result.json();
        setAssign(resultAns);
      }
    } catch (error) {
      console.error("Error fetching task data:", error);
    }
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssign({
      ...assign,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/Updatetask/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assign),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to assign: ${response.status} ${response.statusText}`
        );
      }

      alert("Updated  Task Successfully");

      navigate("/assigned");
    } catch (error) {
      console.error("Error:", error.message); // Log the error message
    }
  };

  return (
    <>
      <div className="main">
        <div className="assignT">
          <form onSubmit={handleSubmit}>
            <p className="h1">Update Task</p>
            <div className="to">
              To
              <input
                type="email"
                placeholder="To"
                name="to"
                value={assign.to}
                onChange={handleChange}
              />
            </div>
            <div className="from">
              From
              <input
                type="email"
                placeholder="From"
                name="from"
                value={assign.from}
                onChange={handleChange}
              />
            </div>
            <div className="task">
              Task
              <input
                type="text"
                placeholder="Task"
                name="task"
                value={assign.task}
                onChange={handleChange}
              />
            </div>
            <div className="description">
              Description
              <br />
              <textarea
                name="description"
                cols="30"
                rows="4"
                value={assign.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="assignB">
              <button type="submit">Assign</button>
            </div>
          </form>
        </div>
        <div className="side">
          <Common />
        </div>
      </div>
    </>
  );
};

export default UpdateTask;
