import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistAPI} from '../api/todolist-api';

export default {
  title: 'API'
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.getTodolist()
      .then((res)=>{
        setState(res)
      })

  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.createTodolist('newTodolist')
      .then(res=>setState(res))

  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todoId = '41603005-4e7e-4432-aee0-56e3002fa88b'
    todolistAPI.deleteTodolist(todoId)
      .then(res=>setState(res))

  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todoId = 'dd52271e-5bbb-4f97-9353-828d13b9f85c'
    todolistAPI.updateTodolistTitle(todoId, 'newTodolist')
      .then(res=>setState(res))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
