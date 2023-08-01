import { nanoid } from "nanoid";
import { createSlice } from "@reduxjs/toolkit";
import { todoService } from "../services/todos.service";
import { setError } from "./errors";

const initialState = {
   entities: [
   ],
   isLoading: true
};

const taskSlice = createSlice({
   name: "task", initialState, reducers: {
      recived(state, action) {
         state.entities = action.payload;
         state.isLoading = false;
      },
      update(state, action) {
         const elementIndex = state.entities.findIndex(
            (e) => e.id === action.payload.id
         );
         state.entities[elementIndex] = { ...state.entities[elementIndex], ...action.payload };
      },
      remove(state, action) {
         const elementIndex = state.entities.findIndex(
            (e) => e.id === action.payload.id
         );
         state.entities.splice(elementIndex, 1)
      },
      add(state, action) {
         state.entities.push({ ...action.payload, completed: false, title: "Task " + action.payload.id })
      },
      taskRequested(state, action) {
         state.isLoading = true;
      },
      taskRequestFailed(state, action) {
         state.isLoading = false;
      },
   }
})

const { actions, reducer: taskReducer, taskRequestFailed } = taskSlice;
export const { update, remove, add, recived, taskRequested } = actions;



export const loadTasks = () => async (dispatch, getState) => {
   dispatch(taskRequested())
   try {
      const data = await todoService.fetch();
      dispatch(recived(data));
   } catch (error) {
      dispatch(setError(error.message))
   }
}
export const completedTask = (taskId) => (dispatch, getState) => {
   dispatch(update({ id: taskId, completed: true }));
};
export const titleChange = (taskId, newTitle) => {
   return update({ id: taskId, title: newTitle })
};

export const taskDelete = (taskId) => {
   return remove({ id: taskId })
};
export const taskAdd = () => {
   return add({ id: nanoid(4) });
};

export const getTasks = () => (state) => state.task.entities;
export const getTaskLoadingStatus = () => (state) => state.task.isLoading;

export default taskReducer;