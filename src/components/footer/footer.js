import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../tasksFilter/tasksFilter';
import './footer.css';

const Footer = (props) => {
  const { completed, onFilter, nameFilter, deleteTaskCompleted } = props;
  return (
    <footer className="footer">
      <span className="todo-count">{completed} items left</span>
      <TasksFilter onFilter={onFilter} nameFilter={nameFilter} />
      <button
        className="clear-completed"
        onClick={() => {
          deleteTaskCompleted();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  completed: PropTypes.number,
  onFilter: PropTypes.func,
  nameFilter: PropTypes.string,
  deleteTaskCompleted: PropTypes.func,
};

Footer.defaultProps = {
  completed: 0,
  onFilter: () => {},
  nameFilter: 'All',
  deleteTaskCompleted: () => {},
};
export default Footer;
