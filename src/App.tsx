import React, { useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from './AddItemForm';

// Create
// Read (pagination, filtration, sorting)
// Update (edit, modification)
// Delete
// CRUD

// Interface

export type FilterValuesType = "all"|"active"|"completed"

type TodoListType ={
  id: string
  title: string
  filter: FilterValuesType
}
type TaskStateType ={
  [todoListId: string]:Array<TaskType>
}

function App() {

  //BLL
  const todoListsId_1:string = v1()
  const todoListsId_2:string = v1()
  const [todoLists, setTodoList]=useState<Array<TodoListType>>([
    {id: todoListsId_1, title: 'What to learn', filter: 'all'},
    {id: todoListsId_2, title: 'What to buy', filter: 'all'},
  ])

  const [tasks, setTasks] = useState<TaskStateType>({
    [todoListsId_1]:[
      {id: v1(), title: "HTML & CSS", isDone: true},
      {id: v1(), title: "ES6 & TS", isDone: true},
      {id: v1(), title: "REACT", isDone: false},
    ],
    [todoListsId_2]:[
      {id: v1(), title: "Water", isDone: true},
      {id: v1(), title: "Meat", isDone: true},
      {id: v1(), title: "Juice", isDone: false},
    ]
  })

  const [filter, setFilter] = useState<FilterValuesType>("all")

  const removeTask = (taskId: string, todoListId: string) => {
    setTasks({...tasks, [todoListId]:tasks[todoListId].filter(t=>t.id!==taskId)})
  }

  const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoList(todoLists.map(t=>t.id===todoListId ? {...t, filter: filter}: t))
  }

  const changeTodoListTitle = (title: string, todoListId: string) => {
    setTodoList(todoLists.map(t=>t.id===todoListId ? {...t, title: title}: t))
  }

  const addTask = (title: string, todoListId: string) => {
    const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
    }
    setTasks({...tasks, [todoListId]:[newTask, ...tasks[todoListId]]})
  }

  const changeTaskTitle = (taskId: string, title: string, todoListId: string)=>{
    setTasks({...tasks, [todoListId]:tasks[todoListId].map(t=>t.id===taskId?{...t, title: title}: t)})
  }



  const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]:tasks[todoListId].map(t=>t.id===taskId?{...t, isDone: isDone}: t)})
  }

  const removeTodoList = (todoListId: string)=>{
      setTodoList(todoLists.filter(t=>t.id!==todoListId))
      const copyTasks = {...tasks}
      delete copyTasks[todoListId]
      setTasks(copyTasks)
  }

  const addTodoList =(title: string)=>{
    const newTodolistId=v1()
    const newTodoList: TodoListType = {
      id:newTodolistId,
      title: title,
      filter: 'all'
    }
    setTodoList([...todoLists, newTodoList])
    setTasks({...tasks,[newTodolistId]:[]})
  }

    //UI

  const getFilteredTasksForRender = (tasks: Array<TaskType>, filter: FilterValuesType):Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
  }


  const todoListsItems = todoLists.map(tl=>{
    const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)
      return (
        <TodoList
          key={tl.id}
          todoListId={tl.id}
          filter={tl.filter}
          title={tl.title}
          tasks={filteredTasksForRender}
          addTask={addTask}
          removeTask={removeTask}
          removeTodoList={removeTodoList}
          changeTaskStatus={changeTaskStatus}
          changeTodoListFilter={changeTodoListFilter}
          changeTaskTitle={changeTaskTitle}
          changeTodoListTitle={changeTodoListTitle}
        />
      )
  })

    return (
        <div className="App">
          <AddItemForm addItem={addTodoList}/>
          {todoListsItems}
        </div>
    );
}

export default App;
