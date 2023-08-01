import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  titleChange,
  taskDelete,
  taskAdd,
  loadTasks,
  getTasks,
  getTaskLoadingStatus,
} from "./store/task";
import configureStore from "./store/store";
import "./index.css";
import { completedTask } from "./store/task";
import { Provider, useDispatch, useSelector } from "react-redux";

const store = configureStore();

const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTaskLoadingStatus());
  const error = useSelector((state) => state.errors.entities[0]);
  const dispatch = useDispatch();
  const changeTitle = (taskId, newTitle) => {
    dispatch(titleChange(taskId, newTitle));
  };
  const deleteTask = (taskId) => {
    dispatch(taskDelete(taskId));
  };
  const addTask = () => {
    dispatch(taskAdd());
  };
  useEffect(() => {
    dispatch(loadTasks());
  }, []);
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div className="todoList">
      <h1 className="button">Todo List</h1>
      <button className="button" onClick={() => addTask()}>
        Add new task
      </button>
      <ul>
        {state.map((task) => (
          <div key={task.id}>
            <li className="task">
              <div className="">
                <p className={task.completed ? "red" : ""}>{task.title}</p>
                <input
                  value={task.title}
                  onChange={(e) => changeTitle(task.id, e.target.value)}
                />
              </div>{" "}
              <div className="">
                {" "}
                Complited: {task.completed.toString()}{" "}
                <button onClick={() => dispatch(completedTask(task.id))}>
                  Completed
                </button>
                <button
                  onClick={() => {
                    deleteTask(task.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
            <hr />
          </div>
        ))}
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
