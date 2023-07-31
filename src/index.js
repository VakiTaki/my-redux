import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { taskCompleted, titleChange, taskDelete, taskAdd } from "./store/task";
import configureStore from "./store/store";
import "./index.css";

const store = configureStore();

const App = () => {
  const [state, setState] = useState(store.getState());
  const completedTask = (taskId) => {
    store.dispatch(taskCompleted(taskId));
  };
  const changeTitle = (taskId, newTitle) => {
    store.dispatch(titleChange(taskId, newTitle));
  };
  const deleteTask = (taskId) => {
    store.dispatch(taskDelete(taskId));
  };
  const addTask = () => {
    store.dispatch(taskAdd());
  };
  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);
  return (
    <>
      <h1>App</h1>
      <button onClick={() => addTask()}>Add new task</button>
      <ul>
        {state.map((task) => (
          <div key={task.id}>
            <li className="task">
              <span className={task.completed ? "red" : ""}>{task.title}</span>
              <input
                value={task.title}
                onChange={(e) => changeTitle(task.id, e.target.value)}
              />{" "}
              Complited: {task.completed.toString()}{" "}
              <button onClick={() => completedTask(task.id)}>Completed</button>
              <button
                onClick={() => {
                  deleteTask(task.id);
                }}
              >
                Delete
              </button>
            </li>
            <hr />
          </div>
        ))}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
