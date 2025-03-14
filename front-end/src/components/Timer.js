import React, { useState, useEffect } from 'react';
import './Timer.css';

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [isRunning, setIsRunning] = useState(false);

  // Update by second
  useEffect(() => {
    if (!isRunning) return; 

    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              clearInterval(timer); 
              return 0;
            } else {
              setHours(prevHours => prevHours - 1);
              setMinutes(59); 
              return 59; 
            }
          } else {
            setMinutes(prevMinutes => prevMinutes - 1); 
            return 59; 
          }
        }
        return prevSeconds - 1; 
      });
    }, 1000);

    return () => clearInterval(timer); 
  }, [isRunning, minutes, seconds, hours]);

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  // Handle user input for setting time
  const handleTimeChange = (e, type) => {
    const value = e.target.value;
    if (type === 'hours') setHours(Math.max(0, value));
    if (type === 'minutes') setMinutes(Math.max(0, value));
    if (type === 'seconds') setSeconds(Math.max(0, value));
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <div className="digital-timer">
      <h1>
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </h1>

      <div className="time-inputs">
        <div className="time-input">
          <label>Hours:</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => handleTimeChange(e, 'hours')}
            disabled={isRunning} 
          />
        </div>
        <div className="time-input">
          <label>Minutes:</label>
          <input
            type="number"
            value={minutes}
            onChange={(e) => handleTimeChange(e, 'minutes')}
            disabled={isRunning}
          />
        </div>
        <div className="time-input">
          <label>Seconds:</label>
          <input
            type="number"
            value={seconds}
            onChange={(e) => handleTimeChange(e, 'seconds')}
            disabled={isRunning} 
          />
        </div>
      </div>

      {/* Start, stop, and reset */}
      <div className="timer-controls">
        {!isRunning ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <button onClick={stopTimer}>Stop</button>
        )}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default Timer;
