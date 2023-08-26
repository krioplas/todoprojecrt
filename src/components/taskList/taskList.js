import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task ';
import './taskList.css';

const TaskList = ({ todo, onDeleted, onTaskActive, onEdited, addTask, onStateTimer }) => {
  const element = todo.map((item) => {
    const { id, ...label } = item;
    const timerTime = (min, sec) => {
      item.min = min;
      item.sec = sec;
    };

    return (
      <Task
        key={id}
        {...label}
        id={id}
        onEdited={onEdited}
        onDeleted={() => {
          onDeleted(id);
        }}
        onTaskActive={() => {
          onTaskActive(id);
        }}
        addTask={() => {
          addTask();
        }}
        onStateTimer={onStateTimer}
        date={item.date}
        min={item.min}
        sec={item.sec}
        timerTime={timerTime}
      />
    );
  });
  return <ul className="todo-list">{element}</ul>;
};

export default TaskList;

TaskList.propTypes = {
  todo: PropTypes.array.isRequired,
  onDeleted: PropTypes.func,
  onTaskActive: PropTypes.func,
  onEdited: PropTypes.func,
  addTask: PropTypes.func,
};
Task.defaultProps = {
  addTask: () => {},
  onTaskActive: () => {},
  onDeleted: () => {},
  onEdited: () => {},
  todo: [],
};
