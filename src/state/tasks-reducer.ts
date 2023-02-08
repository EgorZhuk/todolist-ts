import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

export type RemoveTaskActionType = ReturnType<typeof RemoveTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>


type ActionsType = RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  |AddTodolistActionType
| RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.todolistId]:state[action.todolistId].filter(t=>t.id!==action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]:[{id:v1(), title: action.title, isDone: false},...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]:state[action.todolistId].map(t=>t.id===action.taskId ? {...t, isDone: action.isDone}: t)
            }
        case 'CHANGE-TASK-TITLE':
            return{
                ...state,
                [action.todolistId]:state[action.todolistId].map(t=>t.id===action.taskId ? {...t, title: action.title}: t)
            }
        case 'ADD-TODOLIST':
            return{
                ...state, [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':{
            // let copyState = {...state}
            // delete copyState[action.id]
            // return copyState
            let {[action.id]:[], ...rest} = {...state}
            return rest
        }




        default:
            return state
    }
}

export const RemoveTaskAC = (taskId: string, todolistId: string) => {
    return { type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string)=>{
    return { type: 'ADD-TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean,todolistId: string,)=>{
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string,todolistId: string,)=>{
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todolistId} as const
}
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title, todolistId:v1()}
}
