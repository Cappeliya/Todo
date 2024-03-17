import { v1 } from "uuid"
import { FilterValuesType, TodoListType } from "../AppWithRedux"


export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}

export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodolistFilterActionType

const initialState: Array<TodoListType> = [
];

export const todolistReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{ id: action.todolistId, title: action.title, filter: 'all' }, ...state]
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state];
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state];
        }
        default:
            return state;
    }
}

export const removeTodoListAC = (todolistId: string): RemoveTodoListActionType => {
    return { type: "REMOVE-TODOLIST", id: todolistId }
}

export const addTodoListAC = (title: string): AddTodoListActionType => {
    return { type: "ADD-TODOLIST", title, todolistId: v1() }
}

export const changeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return { type: "CHANGE-TODOLIST-TITLE", id, title }
}

export const changeTodoListFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterActionType => {
    return { type: "CHANGE-TODOLIST-FILTER", filter, id: todolistId }
}