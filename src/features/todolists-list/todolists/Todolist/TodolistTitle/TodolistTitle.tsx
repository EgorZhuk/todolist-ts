import React, {FC} from 'react';
import {TodolistDomainType, todolistsThunks} from 'features/todolists-list/todolists/todolists.reducer';
import {EditableSpan} from 'common/components';
import {IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {useActions} from 'common/hooks';

type Props = {
  todolist: TodolistDomainType
}
export const TodolistTitle: FC<Props> = ({todolist})=> {
  const {removeTodolist, changeTodolistTitle} = useActions(todolistsThunks)
  const removeTodolistHandler = () => {
    removeTodolist(todolist.id)
  }

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({title, id: todolist.id})
  }
  return (
    <div>
      <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler}/>
        <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === 'loading'}>
          <Delete/>
        </IconButton>
      </h3>
    </div>
  );
};