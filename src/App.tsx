import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterType='All' | 'Active' | 'Complete'

function App() {

    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])


    // console.log(filteredTasks);
    // const taskFilter = (filterValue: FilterType)=>{
    //     setFilteredTasks(filteredTasks)
    //     if(filterValue==='Active'){
    //         tasks = tasks.filter((el)=>!el.isDone)
    //     }
    //     if(filterValue==='Complete'){
    //         tasks = tasks.filter((el)=>el.isDone)
    //     }
    // }
    // const taskFilter = (filterValue: FilterType)=>{
    //     setFilteredTasks(filterValue)
    //
    // }
    //
    // let durshlag = tasks
    // if(filteredTasks==='Active'){
    //     durshlag = tasks.filter((el)=>!el.isDone)
    // }
    // if(filteredTasks==='Complete'){
    //     durshlag = tasks.filter((el)=>el.isDone)
    // }

const removeTask = (data:number)=>{

    setTasks(tasks.filter((el)=>el.id!==data))
}

    return (
        <div className="App">
            <Todolist
              title="What to learn"
              tasks={tasks}
              removeTask={removeTask}/>

        </div>
    );
}

export default App;
