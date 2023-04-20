import React, {FC} from 'react';
import {TaskType} from 'features/todolists-list/todolists.api';
import {TaskStatuses} from 'common/enums';
import {FilterValuesType} from 'features/todolists-list/todolists.reducer';
import {Task} from 'features/todolists-list/tasks/task/Task';

type Props = {
  tasks: TaskType[]
  filter: FilterValuesType
  todolistId: string
}
export const Tasks: FC<Props> = ({tasks, filter, todolistId})=> {
  let tasksForTodolist = tasks

  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
  }
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
  }
  return (
    <div>
      {
        tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={todolistId}
        />)
      }
    </div>
  );
};

