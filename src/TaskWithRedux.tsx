import React, {ChangeEvent, memo} from 'react';
import {Checkbox} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {TaskType} from './Todolist';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, RemoveTaskAC} from './state/tasks-reducer';

export type TaskPropsType = {
  task: TaskType
  todolistId: string
}

export const TaskWithRedux = memo(({
                task, todolistId}: TaskPropsType) => {
  let {id, isDone, title} = task
  const dispatch = useDispatch()

  const onClickHandler = () => dispatch(RemoveTaskAC(id, todolistId))
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    dispatch(changeTaskStatusAC(id, newIsDoneValue, todolistId));
  }
  const onTitleChangeHandler = (newValue: string) =>
    dispatch(changeTaskTitleAC(id, newValue, todolistId));

    return <div className={isDone ? "is-done" : ""}>
      <Checkbox
        checked={isDone}
        color="primary"
        onChange={onChangeHandler}
      />

      <EditableSpan value={title} onChange={onTitleChangeHandler}/>
      <IconButton onClick={onClickHandler}>
        <Delete/>
      </IconButton>
    </div>
  });