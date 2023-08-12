import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './task.css';

export default class Task extends React.Component {
  state = {
    label: '',
    editing: false,
    timer: 'off',
    min: this.props.min,
    sec: this.props.sec,
  };
  timer;
  componentDidUpdate() {
    if (this.state.timer === 'on') {
      this.timer = setTimeout(() => {
        this.props.onStateTimer(this.state.min, this.state.sec - 1);
        let sec = this.state.sec;
        sec--;
        this.setState({ sec: sec });
      }, 1000);
      if (this.state.sec === -1) {
        let min = this.state.min;
        min--;
        this.setState({ min: min, sec: 59 });
      } else if (this.state.sec === 0 && this.state.min === 0) {
        this.setState({ timer: 'off' });
      }
    }
  }
  timerOff = () => {
    clearTimeout(this.timer);
    this.setState({ timer: 'off' });
  };
  timerOn = () => {
    clearTimeout(this.timer);
    this.setState({ timer: 'on' });
  };
  editingTask = () => {
    this.setState({ editing: true });
  };

  redTask = (e) => {
    e.preventDefault();
    this.props.onEdited(this.props.id, this.state.label);
    this.setState({ editing: false });
  };

  render() {
    const { label, onDeleted, onTaskActive, completed, date } = this.props;
    const className = cn('li', {
      completed: completed,
      editing: this.state.editing,
    });
    let editTaskForm = null;
    const onTaskChange = (e) => {
      this.setState({
        label: e.target.value,
      });
    };
    if (this.state.editing) {
      editTaskForm = (
        <form onSubmit={this.redTask}>
          <input type="text" className="new-todo" defaultValue={label} autoFocus onChange={onTaskChange}></input>
        </form>
      );
    }
    const taskCreateTime = formatDistanceToNow(date, {
      includeSeconds: true,
      addSuffix: true,
    });

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onTaskActive} defaultChecked={completed} />
          <label>
            <span className="title">{label}</span>
            <span className="description">
              <button
                className="icon icon-play"
                onClick={() => {
                  this.timerOn();
                }}
              ></button>
              <button
                className="icon icon-pause"
                onClick={() => {
                  this.timerOff();
                }}
              ></button>
              {this.state.min + ':' + this.state.sec}
            </span>
            <span className="description time_edit">created {taskCreateTime}</span>
          </label>
          <button className="icon icon-edit" onClick={this.editingTask}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {editTaskForm}
      </li>
    );
  }
}
Task.propTypes = {
  label: PropTypes.string,
  onDeleted: PropTypes.func,
  onTaskActive: PropTypes.func,
  completed: PropTypes.bool,
  id: PropTypes.number,
  onEdited: PropTypes.func,
};
Task.defaultProps = {
  onTaskActive: () => {},
  onDeleted: () => {},
  onEdited: () => {},
  label: '',
  completed: false,
};
