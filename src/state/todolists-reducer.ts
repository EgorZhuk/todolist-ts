import { v1 } from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {AddTaskActionType} from './tasks-reducer';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    title: string
    filter: FilterValuesType
}
export type SetTodoListActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    |SetTodoListActionType
    | AddTaskActionType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case 'SET-TODOLISTS':
            return action.todolists.map(tl=>({
                ...tl, filter: 'all'
            }))
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string, todolistId: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: todolistId}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, title: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, title: title, filter: filter}
}
export const setTodolistAC = (todolists: Array<TodolistType>): SetTodoListActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}



export const getTodoesThunkCreator = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
      .then(res=>dispatch(setTodolistAC(res.data)))
}

export const removeTodolistTC = (todoId: string) =>(dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todoId)
      .then(res=>{
          dispatch(removeTodolistAC(todoId))
      })
}
export const createTodolistTC = (title: string) =>(dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
      .then(res=>{
          dispatch(addTodolistAC(title, res.data.data.item.id))
      })
}
export const updateTodolistTitleTC = (todoId: string, title: string)=>(dispatch: Dispatch)=>{
    todolistsAPI.updateTodolist(todoId,title)
      .then(res=>{
          dispatch(changeTodolistTitleAC(todoId, title))
      })
}
export const updateTodolistFilterTC = (todoId: string, title: string, filter: FilterValuesType)=>(dispatch: Dispatch)=>{
    todolistsAPI.updateTodolist(todoId,title)
      .then(res=>{
          dispatch(changeTodolistFilterAC(todoId, title, filter))
      })
}