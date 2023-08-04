import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import './task.css'

export default class Task extends React.Component {

    state = {
        label: '',
        editing: false,

    }
    editingTask = (e) => {
        this.setState({ editing: true })
    }
    redTask = (e) => {
        e.preventDefault()
        this.props.onEdited(this.props.id, this.state.label)
        this.setState({ editing: false })
    }

    render() {
        const { label, onDeleted, onTaskActive, completed, date } = this.props
        let className = '';
        if (completed) {
            className += 'completed'
        }
        if (this.state.editing) {
            className += ' editing'
        }
        let editTaskForm = null
        let onTaskChange = (e) => {
            this.setState({
                label: e.target.value
            })
        }
        if (this.state.editing) {
            editTaskForm = (
                <form onSubmit={this.redTask}>
                    <input
                        type="text"
                        className="new-todo"
                        defaultValue={label}
                        autoFocus
                        onChange={onTaskChange}
                    ></input>
                </form>
            )
        }
        let taskCreateTime = formatDistanceToNow(date, {
            includeSeconds: true,
            addSuffix: true,
        })
        return (
            <li className={className}>
                <div className="view">
                    <input className="toggle" type="checkbox" onChange={onTaskActive} />
                    <label>
                        <span className="description">{label}</span>
                        <span className="created">created {taskCreateTime}</span>
                    </label>
                    <button className="icon icon-edit" onClick={this.editingTask}></button>
                    <button className="icon icon-destroy" onClick={onDeleted}></button>
                </div>
                {editTaskForm}
            </li>
        )
    }
}
Task.propTypes = {
    label: PropTypes.string,
    onDeleted: PropTypes.func,
    onTaskActive: PropTypes.func,
    completed: PropTypes.bool,
}
Task.defaultProps = {
    onTaskActive: () => { },
    onDeleted: () => { },
    label: '',
    completed: false,
}

