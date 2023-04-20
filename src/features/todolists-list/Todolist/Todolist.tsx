import React, {FC, memo, useCallback, useEffect} from 'react';
import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Task } from '../tasks/task/Task'
import {
	TodolistDomainType,
	todolistsThunks
} from 'features/todolists-list/todolists.reducer';
import { tasksThunks } from 'features/todolists-list/tasks/tasks.reducer';
import { TaskType } from 'features/todolists-list/todolists.api';
import { TaskStatuses } from 'common/enums';
import { useActions} from 'common/hooks';
import { AddItemForm, EditableSpan } from 'common/components'
import {FilterTasksButtons} from 'features/todolists-list/Todolist/FilterTasksButtons';
import {Tasks} from 'features/todolists-list/Todolist/Tasks';
import {TodolistTitle} from 'features/todolists-list/Todolist/TodolistTitle';

type Props = {
	tasks: TaskType[]
	todolist: TodolistDomainType
}
export const Todolist: FC<Props> = memo( ({tasks, todolist}) => {
	const {fetchTasks, addTask} = useActions(tasksThunks)

	useEffect(() => {
		fetchTasks(todolist.id)
	}, [])

	const addTaskHandler = (title: string) => {
		addTask({title, todolistId: todolist.id}).unwrap()
	}

	return <div>
		<TodolistTitle todolist={todolist}/>
		<AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === 'loading'}/>
		<Tasks todolistId={todolist.id} tasks={tasks} filter={todolist.filter}/>
		<div style={{paddingTop: '10px'}}>
			<FilterTasksButtons todolist={todolist}/>
		</div>

	</div>
})


