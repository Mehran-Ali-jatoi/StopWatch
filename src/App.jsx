import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false); 
  const [intervalId, setIntervalId] = useState(null);
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSec) => {
          if (prevSec < 59) {
            return prevSec + 1;
          } else {
            setMinutes((prevMin) => {
              if (prevMin < 59) {
                return prevMin + 1;
              } else {
                setHours((prevHour) => prevHour + 1);
                return 0;
              }
            });
            return 0;
          }
        });
      }, 1000);
      setIntervalId(interval); 
    } else if (!isActive && intervalId) {
      clearInterval(intervalId);
    }
    return () => clearInterval(interval); 
  }, [isActive, seconds]);
  const handleStart = () => setIsActive(true);
  const handleStop = () => setIsActive(false);
  const handleReset = () => {
    setIsActive(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };
  return (
    <>
      <div className="main">
        <h1>Stopwatch</h1>
        <div className="stopWatch">
          <div className="top">
            <div className="Hour">
              <p>Hours</p>
              <span>{hours}</span>
            </div>
            <div className="minutes">
              <p>Minutes</p>
              <span>{minutes}</span>
            </div>
            <div className="seconds">
              <p>Seconds</p>
              <span>{seconds}</span>
            </div>
          </div>
          <div className="bottom">
            <div className="start">
              <button onClick={handleStart}>Start</button>
            </div>
            <div className="stop">
              <button onClick={handleStop}>Stop</button>
            </div>
            <div className="reset">
              <button onClick={handleReset}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
