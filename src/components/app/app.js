import React, { useState } from 'react';

import AppHeader from '../header/header';
import NewTaskForm from '../newTaskForm/newTaskForm';
import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';

import './app.css';

let newId = 0;
const App = () => {
  const [appData, setAppData] = useState([]);
  const [nameFilter, setNameFilter] = useState('All');
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  min;
  sec;
  let createTask = (label, min, sec) => {
    return {
      label,
      id: newId++,
      completed: false,
      date: new Date(),
      min: min,
      sec: sec,
    };
  };

  let deleteTaskCompleted = () => {
    const resAppData = appData.filter((el) => !el.completed);
    setAppData(resAppData);
  };

  let deleteTask = (id) => {
    const resAppData = appData.filter((el) => el.id !== id);
    setAppData(resAppData);
  };

  let addTask = (text, min, sec) => {
    const newTask = createTask(text, min, sec);
    console.log(newTask);
    const newAppData = [...appData, newTask];
    setAppData(newAppData);
  };

  let onTaskActive = (id) => {
    const index = appData.findIndex((el) => el.id === id);
    const oldTask = appData[index];
    const newTask = { ...oldTask, completed: !oldTask.completed };
    const resAppData = [...appData.slice(0, index), newTask, ...appData.slice(index + 1)];
    setAppData(resAppData);
  };

  let onFilter = (name) => {
    setNameFilter(name);
  };

  let onStateTimer = (min, sec) => {
    setSec(sec);
    setMin(min);
  };
  let editItem = (id, text) => {
    let res = appData.map((el) => {
      if (el.id === id) el.label = text;
      return el;
    });
    setAppData(res);
  };

  const completedTaskFilter = appData.filter((el) => {
    if (nameFilter === 'Active') {
      return !el.completed;
    } else if (nameFilter === 'Completed') {
      return el.completed;
    } else {
      return true;
    }
  });
  const activeTask = appData.filter((el) => !el.completed).length;

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <AppHeader />
          <NewTaskForm addTask={addTask} />
        </header>
        <TaskList
          todo={completedTaskFilter}
          onEdited={editItem}
          onDeleted={deleteTask}
          onTaskActive={onTaskActive}
          addTask={addTask}
          onStateTimer={onStateTimer}
        />
        <Footer
          completed={activeTask}
          todo={appData}
          onFilter={onFilter}
          nameFilter={nameFilter}
          onTaskActive={onTaskActive}
          deleteTaskCompleted={deleteTaskCompleted}
        />
      </section>
    </div>
  );
};
export default App;
