import React, { Component } from 'react';

import AppHeader from '../header/header';
import NewTaskForm from '../newTaskForm/newTaskForm';
import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';

import './app.css';

export default class App extends Component {
  state = {
    appData: [],
    id: 0,
    date: new Date(),
  };

  newId = 5;
  createTask = (label) => {
    return {
      label,
      id: this.newId++,
      completed: false,
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

  addTask = (text) => {
    const newTask = this.createTask(text);
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

  onFilter = (id) => {
    this.setState({ id });
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
      if (this.state.id === 1) {
        return !el.completed;
      } else if (this.state.id === 2) {
        return el.completed;
      } else {
        return true;
      }
    });
    const completedTask = this.state.appData.filter((el) => el.completed).length;
    const leftoversTask = this.state.appData.length - completedTask;

    return (
      <div>
        <AppHeader />
        <section className="todoapp">
          <NewTaskForm addTask={this.addTask} />
          <TaskList
            todo={completedTaskFilter}
            onEdited={this.editItem}
            completedTaskList={this.completedTaskList}
            onDeleted={this.deleteTask}
            onTaskActive={this.onTaskActive}
            addTask={this.addTask}
            date={this.state.date}
          />
          <Footer
            completed={leftoversTask}
            todo={this.state.appData}
            onFilter={this.onFilter}
            idActive={this.state.id}
            onTaskActive={this.onTaskActive}
            deleteTaskCompleted={this.deleteTaskCompleted}
          />
        </section>
      </div>
    );
  }
}
