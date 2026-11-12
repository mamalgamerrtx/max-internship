import React, { useEffect, useState } from "react";

function formatTimeLeft(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
}

// Keeps its own ticking state so the parent (and any carousel around it) doesn't re-render every second.
const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(expiryDate - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(expiryDate - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [expiryDate]);

  if (timeLeft <= 0) {
    return <div className="de_countdown">Expired</div>;
  }

  return <div className="de_countdown">{formatTimeLeft(timeLeft)}</div>;
};

export default Countdown;
