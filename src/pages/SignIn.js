import React, { useState, useEffect } from "react";
// import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [attendance, setAttendance] = useState({
    employee: "",
    attendance: [{ attended: 0, total: 0 }],
    date: new Date(), 
    login: "00:00:00", 
    logout: "00:00:00", 
  });

 
  const now = new Date();

  const currentDate = now.toDateString().slice(8,);
  const currentTime = now.toTimeString().slice(0, 8);

  // Use useEffect to update the attendance state
  useEffect(() => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      employee: formData.email,
      date: currentDate,
      login: currentTime,
    }));
  }, [formData.email, currentTime, currentDate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      response = await response.json();



      let attend = await fetch(
        `http://localhost:5000/attendanceLogin/${formData.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attendance),
        }
      );

      if (!attend.ok) {
        throw new Error("Error in attendance");
      }

      attend = await attend.json();

      localStorage.setItem("loginId", JSON.stringify(attend));

      localStorage.setItem("user", JSON.stringify(response));
      localStorage.setItem("viewId", JSON.stringify(response._id));
      history("/admin");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="input">
              <FontAwesomeIcon icon="fa-solid fa-envelope" className="logo" />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input">
              <FontAwesomeIcon icon="fa-solid fa-key" className="logo" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && <div className="error">{error}</div>}

          <div className="forgot-password">
          Forgot Password? <span>Click Here</span>
          </div>

          <div className="submit-container">
            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
