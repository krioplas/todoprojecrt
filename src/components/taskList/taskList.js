import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task ';
// import TaskEdit from '../taskEdit/taskEdit';

import './taskList.css';

const TaskList = ({ todo, onDeleted, onTaskActive, onEdited, addTask, sec, min, onStateTimer }) => {
  const element = todo.map((item) => {
    const { id, ...label } = item;
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
        date={item.date}
        sec={sec}
        min={min}
        onStateTimer={(sec, min) => {
          onStateTimer(sec, min);
        }}
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
