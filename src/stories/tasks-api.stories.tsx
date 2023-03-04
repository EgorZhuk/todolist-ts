import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistAPI} from '../api/todolist-api';
import {taskAPI} from '../api/tasks-api';

export default {
  title: 'API/Tasks'
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '67d34da7-9401-46b0-a72d-56fb811da283'
    taskAPI.getTasks(todolistId)
      .then((res)=>{
        setState(res.data)
      })

  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '67d34da7-9401-46b0-a72d-56fb811da283'
    taskAPI.createTask('newTask', todolistId)
      .then(res=>setState(res.data))

  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '67d34da7-9401-46b0-a72d-56fb811da283'
    const taskId = '742b9c6e-6ced-438d-a7e6-ccc349f7c949'
    taskAPI.deleteTask(todolistId, taskId)
      .then(res=>setState(res.data))

  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todoId = '67d34da7-9401-46b0-a72d-56fb811da283'
    const taskId = '33755f9d-c13c-4ea9-bcc3-d36ccbf19992'
    taskAPI.updateTaskTitle(todoId, taskId, 'NEW')
      .then(res=>setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
