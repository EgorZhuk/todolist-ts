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
    addTask: (title: string) => void
    checkBoxChange: (id: string, checkedValue: boolean)=>void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string|null>('')
    let [buttonName, setButtonName]= useState<FilterValuesType>('all')

    const addTask = () => {
        if (title.trim()){
        props.addTask(title.trim());
        setTitle("");}
        else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask();
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all");
        setButtonName('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active");
        setButtonName('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed");
        setButtonName('completed')
    }

    const onChangeCheckBoxHandler = (tId: string, event: boolean)=>{
        props.checkBoxChange(tId, event)
    }

    const onClickHandler = (tId: string) => props.removeTask(tId)

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   className={error?'error':''}
                   onChange={ onChangeHandler }
                   onKeyDown={ onKeyPressHandler }
            />
            <button onClick={addTask}>+</button>
        </div>

        {
            error && <div className={'error-message'}>{error}</div>
        }
        <ul>
            {
                props.tasks.map(t => {

                    return <li key={t.id}>
                        <input
                          type="checkbox"
                          checked={t.isDone}
                          onChange={(event:ChangeEvent<HTMLInputElement>)=>onChangeCheckBoxHandler(t.id, event.currentTarget.checked)}/>
                        <span className={t.isDone?'is-done':''}>{t.title}</span>
                        <button onClick={()=> onClickHandler(t.id) }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button
              className={buttonName==='all'?'active-filter':''}
              onClick={ onAllClickHandler }
            >
                All
            </button>
            <button
              className={buttonName==='active'?'active-filter':''}
              onClick={ onActiveClickHandler }
            >
                Active
            </button>
            <button
              className={buttonName==='completed'?'active-filter':''}
              onClick={ onCompletedClickHandler }
            >
                Completed
            </button>
        </div>
    </div>
}
