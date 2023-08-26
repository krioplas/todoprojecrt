import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './task.css';
import Timer from '../timer/timer';

const Task = (props) => {
  let { onEdited, id, label, onDeleted, onTaskActive, completed, date, min, sec, onStateTimer, timerTime } = props;
  let [text, setText] = useState('');
  let [editing, setEditing] = useState(false);

  let redTask = (e) => {
    e.preventDefault();
    onEdited(id, text);
    setEditing(false);
  };

  const className = cn('li', {
    completed: completed,
    editing: editing,
  });
  let editTaskForm = null;
  const onTaskChange = (e) => {
    setText(e.target.value);
  };
  if (editing) {
    editTaskForm = (
      <form onSubmit={redTask}>
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
          <Timer min={min} sec={sec} onStateTimer={onStateTimer} timerTime={timerTime} />
          <span className="description time_edit">created {taskCreateTime}</span>
        </label>
        <button className="icon icon-edit" onClick={() => setEditing(true)}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      {editTaskForm}
    </li>
  );
};

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
export default Task;
