import React, {FC, memo, useEffect} from 'react';
import {
	TodolistDomainType,
} from 'features/todolists-list/todolists/todolists.reducer';
import { tasksThunks } from 'features/todolists-list/tasks/tasks.reducer';
import { useActions} from 'common/hooks';
import { AddItemForm } from 'common/components'
import {FilterTasksButtons} from 'features/todolists-list/todolists/Todolist/FilterTasksButtons/FilterTasksButtons';
import {TasksList} from 'features/todolists-list/todolists/Todolist/TasksList/TasksList';
import {TodolistTitle} from 'features/todolists-list/todolists/Todolist/TodolistTitle/TodolistTitle';
import {TaskType} from 'features/todolists-list/tasks/tasks.api';

type Props = {
	tasks: TaskType[]
	todolist: TodolistDomainType
}
export const Todolist: FC<Props> = memo( ({tasks, todolist}) => {
	const {fetchTasks, addTask} = useActions(tasksThunks)

	useEffect(() => {
		fetchTasks(todolist.id)
	}, [])

	const addTaskCallback = (title: string) => {
		return addTask({title, todolistId: todolist.id}).unwrap()
	}

	return <div>
		<TodolistTitle todolist={todolist}/>
		<AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'}/>
		<TasksList todolistId={todolist.id} tasks={tasks} filter={todolist.filter}/>
		<div style={{paddingTop: '10px'}}>
			<FilterTasksButtons todolist={todolist}/>
		</div>

	</div>
})


