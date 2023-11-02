import React, { Component } from 'react';

import AppHeader from '../header/header';
import NewTaskForm from '../newTaskForm/newTaskForm';
import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';

import './app.css';

export default class App extends Component {
  state = {
    appData: [],
    nameFilter: 'All',
    min: 0,
    sec: 0,
  };

  newId = 0;
  createTask = (label, min, sec) => {
    return {
      label,
      id: this.newId++,
      completed: false,
      date: new Date(),
      min: min,
      sec: sec,
    };
  };

  deleteTaskCompleted = () => {
    this.setState(({ appData }) => {
      const resAppData = appData.filter((el) => !el.completed);
      return {
        appData: resAppData,
      };
    });
  };

  deleteTask = (id) => {
    this.setState(({ appData }) => {
      const resAppData = appData.filter((el) => el.id !== id);
      return {
        appData: resAppData,
      };
    });
  };

  addTask = (text, min, sec) => {
    const newTask = this.createTask(text, min, sec);
    this.setState(({ appData }) => {
      const newAppData = [...appData, newTask];
      return {
        appData: newAppData,
      };
    });
  };

  onTaskActive = (id) => {
    this.setState(({ appData }) => {
      const index = appData.findIndex((el) => el.id === id);
      const oldTask = appData[index];
      const newTask = { ...oldTask, completed: !oldTask.completed };
      const resAppData = [...appData.slice(0, index), newTask, ...appData.slice(index + 1)];
      return {
        appData: resAppData,
      };
    });
  };

  onFilter = (name) => {
    this.setState({ nameFilter: name });
  };
  onStateTimer = (min, sec) => {
    this.setState({ min: min, sec: sec });
  };
  editItem = (id, text) => {
    this.setState(({ appData }) => {
      return {
        appData: appData.map((el) => {
          if (el.id === id) el.label = text;
          return el;
        }),
      };
    });
  };

  render() {
    const completedTaskFilter = this.state.appData.filter((el) => {
      if (this.state.nameFilter === 'Active') {
        return !el.completed;
      } else if (this.state.nameFilter === 'Completed') {
        return el.completed;
      } else {
        return true;
      }
    });
    const activeTask = this.state.appData.filter((el) => !el.completed).length;

    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <AppHeader />
            <NewTaskForm addTask={this.addTask} />
          </header>
          <TaskList
            todo={completedTaskFilter}
            onEdited={this.editItem}
            completedTaskList={this.completedTaskList}
            onDeleted={this.deleteTask}
            onTaskActive={this.onTaskActive}
            addTask={this.addTask}
            onStateTimer={this.onStateTimer}
          />
          <Footer
            completed={activeTask}
            todo={this.state.appData}
            onFilter={this.onFilter}
            nameFilter={this.state.nameFilter}
            onTaskActive={this.onTaskActive}
            deleteTaskCompleted={this.deleteTaskCompleted}
          />
        </section>
      </div>
    );
  }
}
