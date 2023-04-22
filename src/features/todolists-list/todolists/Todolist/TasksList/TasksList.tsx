import React, {FC} from 'react';
import {TaskStatuses} from 'common/enums';
import {FilterValuesType} from 'features/todolists-list/todolists/todolists.reducer';
import {Task} from 'features/todolists-list/tasks/task/Task';
import {TaskType} from 'features/todolists-list/tasks/tasks.api';

type Props = {
  tasks: TaskType[]
  filter: FilterValuesType
  todolistId: string
}
export const TasksList: FC<Props> = ({tasks, filter, todolistId})=> {
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

