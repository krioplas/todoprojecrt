import React from 'react';
import PropTypes from 'prop-types';

import './newTaskForm.css';

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
  };

  onTaskChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmitTask = (e) => {
    e.preventDefault();
    if (this.state.label.trim() !== '') {
      this.props.addTask(this.state.label);
    }
    this.setState({
      label: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmitTask}>
        <input
          type="text"
          maxLength={30}
          minLength={3}
          className="new-todo"
          placeholder="Введите задачу и нажмите Enter"
          autoFocus
          onChange={this.onTaskChange}
          value={this.state.label}
        />
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
