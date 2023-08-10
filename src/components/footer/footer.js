import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../tasksFilter/tasksFilter';
import './footer.css';

export default class Footer extends React.Component {
  render() {
    const { completed, onFilter, nameFilter, deleteTaskCompleted } = this.props;

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
  }
}
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
