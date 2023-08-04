import React from 'react'
import Task from '../task/task '
import PropTypes from 'prop-types'
// import TaskEdit from '../taskEdit/taskEdit';

import './taskList.css'

const TaskList = ({ todo, onDeleted, onTaskActive, onEdited, addTask, date }) => {

    const element = todo.map((item) => {
        const { id, ...label } = item
        return (
            <Task key={id} {...label}
                id={id}
                onEdited={onEdited}
                onDeleted={() => { onDeleted(id) }}
                onTaskActive={() => { onTaskActive(id) }}
                addTask={() => { addTask() }}
                date={date}
            />

        )
    })
    return (
        <ul className="todo-list">
            {element}
        </ul>
    )

}

TaskList.propTypes = {
    todo: PropTypes.array.isRequired,
    onDeleted: PropTypes.func,
    onTaskActive: PropTypes.func,
    onEdited: PropTypes.func,
    addTask: PropTypes.func,
}

export default TaskList