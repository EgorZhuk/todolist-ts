import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// title - заголовок
// tasks - список задач

type TodoListPropsType = {
    todoListId:string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>

    removeTodoList: (todoListId:string)=>void
    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string)=> void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    const tasksItems = props.tasks.length
        ? props.tasks.map((task: TaskType) => {
            const onClickRemoveTaskHandler = () => props.removeTask(task.id, props.todoListId)
            const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
            const onChangeSetTaskTitle = (title: string)=>{
              props.changeTaskTitle(task.id, title, props.todoListId)
            }

        const isDoneClasses = task.isDone ? "isDone" : "notIsDone"
            return (
                <li key={task.id}>
                  <Checkbox
                    size={'small'}
                    checked={task.isDone}
                    onChange={onChangeSetTaskStatus}
                  />
                    <EditableSpan
                      classes={isDoneClasses}
                      title={task.title}
                      changeTitle={onChangeSetTaskTitle}
                    />
                  <IconButton
                    size={'small'}
                    onClick={onClickRemoveTaskHandler}>
                    <DeleteIcon
                      color={'primary'}
                    />
                  </IconButton>

                </li>
            )
        })
        : <span>Tasks list is empty</span>

    const addTask= (title:string) => props.addTask(title, props.todoListId)

    const getOnClickSetFilterHandler = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)

    const onClickRemoveTodoListHandler = ()=>props.removeTodoList(props.todoListId)

    const changeTodoListTitle = (title: string)=>props.changeTodoListTitle(title, props.todoListId)


    return (
        <div>
            <h3>
              <EditableSpan
                title={props.title}
                classes={''}
                changeTitle={changeTodoListTitle}
              />
              <IconButton
                size={'small'}
                onClick={onClickRemoveTodoListHandler}>
                <DeleteIcon
                  color={'primary'}
                />
              </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul>
                {tasksItems}
            </ul>
            <div>
              <ButtonGroup
                size={'small'}
                disableElevation
                variant='contained'
                fullWidth
              >

                <Button
                  sx={{mr:'4px'}}//styles
                  color={props.filter === "all"? "secondary" : 'primary'}
                  onClick={getOnClickSetFilterHandler("all")}>All</Button>
                <Button
                  sx={{mr:'4px'}}
                  color={props.filter === "active"? "secondary" : 'primary'}
                  onClick={getOnClickSetFilterHandler("active")}>Active</Button>
                <Button
                  color={props.filter === "completed"? "secondary" : 'primary'}
                  onClick={getOnClickSetFilterHandler("completed")}>Completed</Button>
              </ButtonGroup>
            </div>
        </div>
    );
};

export default TodoList;