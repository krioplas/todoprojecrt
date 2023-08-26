import React from 'react';
import PropTypes from 'prop-types';
import './tasksFilter.css';

const TasksFilter = (props) => {
  let { onFilter, nameFilter } = props;
  const ToDoData = [{ name: 'All' }, { name: 'Active' }, { name: 'Completed' }];
  let id = 0;
  const element = ToDoData.map((item) => {
    const { name } = item;
    return (
      <li key={id++}>
        <button
          {...item}
          onClick={() => {
            onFilter(name);
          }}
          className={nameFilter === name ? 'selected' : ''}
        >
          {item.name}
        </button>
      </li>
    );
  });
  return <ul className="filters">{element}</ul>;
};
TasksFilter.defaultProps = {
  onFilter: () => {},
  nameFilter: 'All',
};

TasksFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  nameFilter: PropTypes.string,
};
export default TasksFilter;
