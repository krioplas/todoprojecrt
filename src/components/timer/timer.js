import React from 'react';
import './timer.css';

export default class Timer extends React.Component {
  state = {
    timer: 'off',
    min: this.props.min,
    sec: this.props.sec,
  };

  stepTimer = () => {
    this.props.timerTime(this.state.min, this.state.sec - 1);
    if (this.state.sec === 0 && this.state.min === 0) {
      clearInterval(this.timer);
    }
    if (this.state.sec > 0 && this.state.min >= 0) {
      let sec = this.state.sec;
      sec--;
      this.setState({ sec: sec });
    }

    if (this.state.sec === 0 && this.state.min > 0) {
      let min = this.state.min;
      min--;
      this.setState({ min: min, sec: 59 });
    }
  };

  timerOff = () => {
    this.setState({ timer: 'off' });
    clearInterval(this.timer);
  };
  timerOn = () => {
    clearInterval(this.timer);
    this.timer = setInterval(this.stepTimer, 1000);
    this.setState({ timer: 'on' });
  };
  render() {
    return (
      <span className="description">
        <button className="icon icon-play" onClick={this.timerOn}></button>
        <button className="icon icon-pause" onClick={this.timerOff}></button>
        {this.state.sec === 0 && this.state.min === 0 ? 'Winner' : this.state.min + ':' + this.state.sec}
      </span>
    );
  }
}
