import React from 'react';
import PropTypes from 'prop-types';
import './tasksFilter.css';

export default class TasksFilter extends React.Component {
  ToDoData = [{ name: 'All' }, { name: 'Active' }, { name: 'Completed' }];

  render() {
    const { onFilter, nameFilter } = this.props;
    const element = this.ToDoData.map((item) => {
      const { name } = item;
      return (
        <li key={Math.random() * 10}>
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
  }
}

TasksFilter.defaultProps = {
  onFilter: () => {},
  nameFilter: 'All',
};

TasksFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  nameFilter: PropTypes.string,
};
