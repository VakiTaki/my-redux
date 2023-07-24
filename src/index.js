import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import * as actions from "./store/actions";
import { initStore } from "./store/store";

const store = initStore();

const App = () => {
  const [state, setState] = useState(store.getState());
  const completedTask = (taskId) => {
    store.dispatch(actions.taskCompleted(taskId));
  };
  const changeTitle = (taskId, newTitle) => {
    store.dispatch(actions.titleChange(taskId, newTitle));
  };
  const deleteTask = (taskId) => {
    store.dispatch(actions.taskDelete(taskId));
  };
  const addTask = () => {
    store.dispatch(actions.taskAdd());
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
          <li key={task.id}>
            <span
              style={task.completed ? { textDecoration: "line-through" } : {}}
            >
              {task.title}
            </span>
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
            <hr />
          </li>
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
