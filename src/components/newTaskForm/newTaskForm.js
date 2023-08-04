import React from 'react'

import './newTaskForm.css'

export default class NewTaskForm extends React.Component {
    state = {
        label: ''
    }

    onTaskChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }
    onSubmitTask = (e) => {
        e.preventDefault()
        if (this.state.label !== '') {
            this.props.addTask(this.state.label)
        }
        this.setState({
            label: ''
        })

    }

    render() {
        return (
            <form onSubmit={this.onSubmitTask}>
                <input className="new-todo" placeholder="Введите задачу и нажмите Enter" autoFocus
                    onChange={this.onTaskChange}
                    value={this.state.label}
                />
            </form>
        )
    }
}



