import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType={
  title: string
  classes: string
  changeTitle: (title: string)=>void
}

export const EditableSpan: FC<EditableSpanPropsType> = (props) => {
  const [editMode, setEditMode]=useState<boolean>(false)
  const [title, setTitle] = useState<string>(props.title)

  const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyDownSetTitle = (e: KeyboardEvent<HTMLInputElement>)=>{
    e.key==='Enter' && offEditMode()
  }

  const onEditMode = ()=>{
    setEditMode(true)
  }

  const offEditMode = ()=>{
    props.changeTitle(title)
    setEditMode(false)
  }

  return (
    editMode
      ?
      <TextField
        variant={'standard'}
        value={title}
        autoFocus={true}
        onBlur={offEditMode}
        onChange={onChangeSetLocalTitleHandler}
        onKeyDown={onKeyDownSetTitle}
      />

      : <span
          onDoubleClick={onEditMode}
          className={props.classes}>
        {props.title}
       </span>

  );
};
