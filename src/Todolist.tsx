import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (inputValue: string) => void
}

export function Todolist(props: PropsType) {
    let [inputValue,setInputValue]=useState('')
    const addTaskHandler = ()=>{
        props.addTask(inputValue)
    setInputValue('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>)=>{
        setInputValue(event.currentTarget.value)}

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>)=>{
        if (event.key === 'Enter'){
            addTaskHandler()
        }
    }
    const removeTaskHandler =(tId: string)=>{
        props.removeTask(tId)
    }

    const changeFilterHandler = (filterValue: FilterValuesType)=>{
        props.changeFilter(filterValue)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
              value={inputValue}
              onChange={onChangeHandler}
              onKeyDown={onKeyPressHandler}
            />
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={ () => { removeTaskHandler(t.id) } }>x</button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={ () => { changeFilterHandler("all") } }>
                All
            </button>
            <button onClick={ () => { changeFilterHandler("active") } }>
                Active
            </button>
            <button onClick={ () => { changeFilterHandler("completed") } }>
                Completed
            </button>
        </div>
    </div>
}
