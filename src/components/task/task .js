import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './task.css';
import Timer from '../timer/timer';

export default class Task extends React.Component {
  state = {
    label: '',
    editing: false,
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
            <Timer
              min={this.props.min}
              sec={this.props.sec}
              onStateTimer={this.props.onStateTimer}
              timerTime={this.props.timerTime}
            />
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
