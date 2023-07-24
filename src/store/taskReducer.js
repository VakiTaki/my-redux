import * as actions from "./actionTypes";

export function taskReducer(state = [], action) {
   switch (action.type) {
      case actions.taskUpdated: {
         const newArray = [...state];
         const elementIndex = newArray.findIndex(
            (e) => e.id === action.payload.id
         );
         newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload };
         return newArray;
      }
      case actions.taskDelete: {
         const newArray = [...state];
         const elementIndex = newArray.findIndex(
            (e) => e.id === action.payload.id
         );
         newArray.splice(elementIndex, 1)
         return newArray;
      }
      case actions.taskAdd: {
         const newArray = [...state];
         newArray.push({ ...action.payload, completed: false, title: "Task " + action.payload.id })
         return newArray;
      }
      default:
         return state;
   }
}