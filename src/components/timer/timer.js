import React, { useEffect, useState } from 'react';
import './timer.css';

const Timer = (props) => {
  const { min, sec, timerTime } = props;

  let [timer, setTimer] = useState('off');
  let [minute, setMinute] = useState(min);
  let [second, setSecond] = useState(sec);
  timer;
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer === 'on') {
        timerTime(minute, second - 1);
        if (second === 0 && minute === 0) {
          clearInterval(interval);
        }
        if (second > 0) {
          setSecond(--second);
        }

        if (second === 0 && minute > 0) {
          setSecond(59);
          setMinute(--minute);
        }
      }
      clearInterval(interval);
    }, 1000);
  });

  return (
    <span className="description">
      <button className="icon icon-play" onClick={() => setTimer('on')}></button>
      <button className="icon icon-pause" onClick={() => setTimer('off')}></button>
      {second === 0 && minute === 0 ? 'Winner' : minute + ':' + second}
    </span>
  );
};
export default Timer;
