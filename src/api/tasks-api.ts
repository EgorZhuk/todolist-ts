import axios from 'axios';
import {DeleteTodolist, UpdateTodolistTitle} from '../stories/todolists-api.stories';


const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
  withCredentials: true
})

export const taskAPI = {
  getTasks(todolistId:string) {
    return instance.get<TaskType[]>(`${todolistId}/tasks`)
  },
  createTask(title: string, todolistId: string) {
    return instance.post<ResponseType<{item: TaskType}>>(`${todolistId}/tasks`,{title})
  },
  deleteTask(todoId:string, taskId: string) {
    return instance.delete<ResponseType>(`${todoId}/tasks/${taskId}`)
  },
  updateTaskTitle(todoId:string, taskId: string, title: string) {
    return instance.put<ResponseType>(`${todoId}/tasks/${taskId}`,{title})
  }
}

type TaskType = {
  description: string
  title: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

type ResponseType<T={}> = {
  data:T
  fieldError:string[]
  messages:string[]
  resultCode: number
}