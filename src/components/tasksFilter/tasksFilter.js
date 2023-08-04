import React from 'react'
import PropTypes from 'prop-types'
import './tasksFilter.css'

export default class TasksFilter extends React.Component {
    ToDoData = [
        { name: 'All', id: 0 },
        { name: 'Active', id: 1 },
        { name: 'Completed', id: 2 },
    ]

    render() {
        let { onFilter, idActive } = this.props
        const element = this.ToDoData.map((item) => {
            const { id } = item
            return (
                <li key={id}>
                    <button  {...item} onClick={() => { onFilter(id) }} className={idActive === id ? 'selected' : ''}>{item.name}</button>
                </li>
            )
        })
        return (
            <ul className="filters" >
                {element}
            </ul>
        )
    }
}

TasksFilter.defaultProps = {
    onFilter: () => { },
    idActive: 0
}

TasksFilter.propTypes = {
    onFilter: PropTypes.func.isRequired,
    idActive: PropTypes.number
}