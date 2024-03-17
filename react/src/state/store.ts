import { combineReducers, createStore } from "redux";
import { todolistReducer } from "./todolist-reducer";
import { tasksReducer } from "./tasksReducer";


const rootReducer = combineReducers({
    todoLists: todolistReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);




// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.store = store;

