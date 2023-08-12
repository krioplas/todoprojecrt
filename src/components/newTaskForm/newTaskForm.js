import React from 'react';
import PropTypes from 'prop-types';

import './newTaskForm.css';

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
    name: '',
    min: '',
    sec: '',
  };

  onTaskChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  onMin = (e) => {
    this.setState({
      min: e.target.value,
    });
  };
  onSec = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };

  onSubmitTask = (e) => {
    e.preventDefault();
    if (this.state.label.trim() !== '') {
      this.props.addTask(this.state.label, this.state.min, this.state.sec);
    }
    this.setState({
      label: '',
      min: '',
      sec: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmitTask} className="new-todo-form">
        <input
          type="text"
          maxLength={30}
          minLength={3}
          className="new-todo"
          placeholder="Введите задачу..."
          autoFocus
          onChange={this.onTaskChange}
          value={this.state.label}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onMin}
          value={this.state.min}
          pattern="/[^\d]/g"
          maxLength={3}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onSec}
          value={this.state.sec}
          pattern="[0-5]{1}[0-9]{1}"
          maxLength={2}
        />
        <button type="submit"></button>
      </form>
    );
  }
}
NewTaskForm.propTypes = {
  addTask: PropTypes.func,
};

NewTaskForm.defaultProps = {
  addTask: () => {},
};
