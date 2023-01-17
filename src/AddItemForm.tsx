import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {Button, ButtonGroup, TextField} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type AddItemFormType = {
  addItem: (title: string)=>void
}

export const AddItemForm: FC<AddItemFormType> = (props) => {

  const [title, setTitle] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false)
    setTitle(e.currentTarget.value)
  }
  const onClickAddItemToTodoListHandler = () => {
    const trimmedTitle = title.trim()
    if(trimmedTitle){
      props.addItem(trimmedTitle)
    } else {
      setError(true)
    }
    setTitle("")
  }
  const onKeyDownAddItemToTodoListHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddItemToTodoListHandler()


  const errorMessageStyles = {color: "hotpink", marginTop: "0", marginBottom: "0"}
  const errorMessage = error && <p style={errorMessageStyles}>Please, enter item title</p>
  const errorInputClasses = error ? "inputError" : undefined

  return (
    <div>

      <TextField
        label={'Enter Title'}
        size={'small'}
        variant={'outlined'}
        value={title}
        error={error}
        helperText={error && 'Please, enter item title'}
        onChange={onChangeSetLocalTitleHandler}
        onKeyDown={onKeyDownAddItemToTodoListHandler}
      />
      <Button
        size={'small'}
        variant={'contained'}
        color={'primary'}
        disableElevation
        onClick={onClickAddItemToTodoListHandler}
        endIcon={
          <AddCircleOutlineIcon/>
        }
      >
        ADD
      </Button>
    </div>
  );
};
