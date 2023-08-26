import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './newTaskForm.css';

const NewTaskForm = (props) => {
  const { addTask } = props;
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  let onTaskChange = (e) => {
    setLabel(e.target.value);
  };

  let onSubmitTask = (e) => {
    e.preventDefault();
    if (label.trim() !== '') {
      addTask(label, Number(min), Number(sec));
    }
    setLabel('');
    setMin('');
    setSec('');
  };

  return (
    <form onSubmit={onSubmitTask} className="new-todo-form">
      <input
        type="text"
        maxLength={30}
        minLength={3}
        className="new-todo"
        placeholder="Введите задачу..."
        autoFocus
        onChange={onTaskChange}
        value={label}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={(e) => setMin(e.target.value)}
        value={min}
        pattern="^\d+$"
        maxLength={3}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={(e) => setSec(e.target.value)}
        value={sec}
        pattern="[0-5]{1}[0-9]{1}"
        maxLength={2}
      />
      <button type="submit"></button>
    </form>
  );
};

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
};

NewTaskForm.defaultProps = {
  addTask: () => {},
};
export default NewTaskForm;
