// @ts-nocheck
import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch } from "react-redux";
import "./Timer.scss";
import { showMessageWithTimeout } from "../../store/appState/actions";
import { Button } from "react-bootstrap";

export default function Timer({ duration, setTimer }) {
  const [timerDone, set_timerDone] = useState(false);
  const dispatch = useDispatch();
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Get Ready...</div>;
    }

    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  const setTimerDone = () => {
    dispatch(showMessageWithTimeout("success", false, "Get ready!", 2000));
    set_timerDone(false);
    setTimer(false);
  };

  return (
    <div className="App">
      <div className="timer-wrapper">
        <div className="timerComponent">
          <CountdownCircleTimer
            isPlaying
            duration={duration}
            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
            onComplete={() => set_timerDone(true)}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
        <Button onClick={(e) => setTimer(false)}>Stop timer</Button>
        {timerDone ? setTimerDone() : null}
      </div>
    </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Timer />, rootElement);
