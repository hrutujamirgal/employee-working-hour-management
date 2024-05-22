import React, { useState, useEffect } from "react";

import CameraComponent from "./CameraComponent";

const Common = () => {
  const [timer, setTimer] = useState(0);

  // Load the timer value from localStorage when the component mounts
  useEffect(() => {
    const storedTimer = localStorage.getItem("timer");
    if (storedTimer) {
      setTimer(parseInt(storedTimer));
    }
  }, []);

 

  // Function to format the timer value in HH:mm:ss format
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
      // Save the updated timer value to localStorage
      localStorage.setItem("timer", timer.toString());
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  

  return (
    <>
      <div className="sidebar">
        <div className="timer">{formatTime(timer)}</div>
        <br />
        <CameraComponent />
      </div>
    </>
  );
};

export default Common;
