import React from 'react'
import TasksFilter from '../tasksFilter/tasksFilter'
import PropTypes from 'prop-types'
import './footer.css'

export default class Footer extends React.Component {

    render() {

        const { completed, onFilter, idActive, deleteTaskCompleted } = this.props

        return (
            <footer className="footer">
                <span className="todo-count">{completed} items left</span>
                <TasksFilter onFilter={onFilter} idActive={idActive} />
                <button className="clear-completed" onClick={() => { deleteTaskCompleted() }}>Clear completed</button>
            </footer>
        )

    }

}
Footer.propTypes = {
    completed: PropTypes.number,
    onFilter: PropTypes.func,
    idActive: PropTypes.number,
    deleteTaskCompleted: PropTypes.func
}

Footer.defaultProps = {
    completed: 0,
    onFilter: () => { },
    idActive: () => { },
    deleteTaskCompleted: () => { }
}

