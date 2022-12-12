import React, {useState} from 'react';
import {FilterType} from './App';

type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: number) => void
  // taskFilter: (filterValue: FilterType) => void

}

export function Todolist(props: PropsType) {
  let [filteredTasks, setFilteredTasks] = useState<FilterType>('All')
  const taskFilter = (filterValue: FilterType) => {
    setFilteredTasks(filterValue);

  };

  let durshlag = props.tasks;
  if (filteredTasks === 'Active') {
    durshlag = props.tasks.filter((el) => !el.isDone);
  }
  if (filteredTasks === 'Complete') {
    durshlag = props.tasks.filter((el) => el.isDone);
  }

  return <div>
    <h3>{props.title}</h3>
    <div>
      <input/>
      <button>+</button>
    </div>
    <ul>
      {durshlag.map((el) =>
        <li key={el.id}>
          <button onClick={() => {
            props.removeTask(el.id);
          }}>X
          </button>
          <input type="checkbox" checked={el.isDone}/>
          <span>{el.title}</span>

        </li>)}
    </ul>
    <div>
      <button onClick={() => {
        taskFilter('All');
      }}>All
      </button>
      <button onClick={() => {
        taskFilter('Active');
      }}>Active
      </button>
      <button onClick={() => {
        taskFilter('Complete');
      }}>Completed
      </button>
    </div>
  </div>;
}
