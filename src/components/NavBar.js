import React, { useState, useEffect} from "react";
// , {useState, useEffect}
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  // const active = 'active';
  const auth = localStorage.getItem("user");
  const person = JSON.parse(auth);

  const navigate = useNavigate();

 

  const logout = async () => {
    const loginId = localStorage.getItem("loginId");
    const id = JSON.parse(loginId);

    try {
      let response = await fetch(
        `http://localhost:5000/UpdateLogout/${id._id}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        alert("Logout Update Failed");
      } else {
        alert("Logout Successfully");
        navigate("/signin");
        localStorage.clear();
      }
    } catch (error) {
      console.log("error in the logout function");
    }
  };


   const [leave, setLeave] = useState({
     employee: "",
     employeeDepartment: "",
     date: new Date(),
     noOfDays: "1",
     type: "",
     reason: "",
   });


  const calculateTime = async () => {
    const time = localStorage.getItem("timer");

    if (time < 27000 && time > 14400) {
      const check = window.confirm(
        "Logout early will be considered as Half Day Leave"
      );
      if (check === true) {
        setLeave({
          ...leave,
          employee: person.email,
          employeeDepartment: person.department,
          reason: "Logout after 4hrs of service",
          type: "Half Day",
        });

        console.log(leave);

        const leave1 = await fetch("http://localhost:5000/askleave", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(leave),
        });

        if (leave1.ok) {
          logout();
        }
      } else {
        navigate("/profile");
      }
    } else if (time <= 14400) {
      const check = window.confirm(
        "Logout early will be considered as Full Day Leave"
      );
      if (check === true) {
        setLeave({
          ...leave,
          employee: person.email,
          employeeDepartment: person.department,
          reason: "Logout within 4hrs of service",
          type: "Full Day",
        });

        const leave2 = await fetch(`http://localhost:5000/askleave`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(leave),
        });

        if (leave2.ok) {
          logout();
        }
      } else {
        navigate("/profile");
      }
    } else {
      alert("Logout after the time");
      logout();
    }
  };


  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.returnValue = "Are you sure you want to leave?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [calculateTime]);

  

  return (
    <>
      {auth ? (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              {person.name}
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/admin"
                  >
                    To-do List
                  </Link>
                </li>
                {person.designation !== "Employee" && (
                  <li className="nav-item">
                    <Link className="nav-link " to="/empdata">
                      Employee Data
                    </Link>
                  </li>
                )}
                {person.designation !== "Employee" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/getAssignedTask">
                      Assigned Task
                    </Link>
                  </li>
                )}

                {person.designation === "Employee" ? (
                  <li className="nav-item">
                    <Link className="nav-link" to="/askLeave">
                      Ask Leave
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/manageLeave">
                      Manage Leave
                    </Link>
                  </li>
                )}

                {person.designation !== "Employee" ? (
                  <li className="nav-item">
                    <Link className="nav-link" to="/assigned">
                      Assign Task
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/assignedEMP">
                      Assigned Task
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    onClick={calculateTime}
                    className="nav-link"
                    to="/signin"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-lg navbar-dark absolute-top">
          <div className="container-fluid">
            <img src={process.env.PUBLIC_URL + "/images/IT.png"} alt="logo" />
            <a className="navbar-brand" href="/">
              WorkIt
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#features">
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">
                    Contact
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default NavBar;
