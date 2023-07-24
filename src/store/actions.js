import * as actionsTypes from "./actionTypes";
import { nanoid } from 'nanoid'

export function taskCompleted(taskId) {
   return {
      type: actionsTypes.taskUpdated,
      payload: { id: taskId, completed: true },
   };
};
export const titleChange = (taskId, newTitle) => {
   return {
      type: actionsTypes.taskUpdated,
      payload: { id: taskId, title: newTitle },
   };
};

export const taskDelete = (taskId) => {
   return {
      type: actionsTypes.taskDelete,
      payload: { id: taskId },
   };
};
export const taskAdd = () => {
   return {
      type: actionsTypes.taskAdd,
      payload: { id: nanoid(4) },
   };
};