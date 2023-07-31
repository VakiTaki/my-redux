import { nanoid } from "nanoid";
import { createAction, createReducer } from "@reduxjs/toolkit";

const update = createAction("task/update");
const remove = createAction("task/delete");
const add = createAction("task/add");

export function taskCompleted(taskId) {
   return update({ id: taskId, completed: true })
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

const initialState = [
   { id: "1", title: "Task 1", completed: false },
   { id: "2", title: "Task 2", completed: false },
];

const taskReducer = createReducer(initialState, (builder) => {
   builder
      .addCase(update, (state, action) => {
         const elementIndex = state.findIndex(
            (e) => e.id === action.payload.id
         );
         state[elementIndex] = { ...state[elementIndex], ...action.payload };
      })
      .addCase(remove, (state, action) => {
         const elementIndex = state.findIndex(
            (e) => e.id === action.payload.id
         );
         state.splice(elementIndex, 1)
      })
      .addCase(add, (state, action) => {
         state.push({ ...action.payload, completed: false, title: "Task " + action.payload.id })
      })
});
// function tasktaskREducer(state = [], action) {
//    switch (action.type) {
//       case update.type: {
//          const newArray = [...state];
//          const elementIndex = newArray.findIndex(
//             (e) => e.id === action.payload.id
//          );
//          newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload };
//          return newArray;
//       }
//       case remove.type: {
//          const newArray = [...state];
//          const elementIndex = newArray.findIndex(
//             (e) => e.id === action.payload.id
//          );
//          newArray.splice(elementIndex, 1)
//          return newArray;
//       }
//       case add.type: {
//          const newArray = [...state];
//          newArray.push({ ...action.payload, completed: false, title: "Task " + action.payload.id })
//          return newArray;
//       }
//       default:
//          return state;
//    }
// }

export default taskReducer;