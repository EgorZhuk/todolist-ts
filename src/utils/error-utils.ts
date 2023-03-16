import {AppActionsType, setErrorAC, setStatusAC} from '../app/app-reducer';
import {Dispatch} from 'redux';
import { ResponseType } from '../api/todolists-api'

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, err: {message:string}) => {
  dispatch(setStatusAC('failed'))
  dispatch(setErrorAC(err.message))
}

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
  if (data.messages.length) {
    dispatch(setErrorAC(data.messages[0]))
  } else {
    dispatch(setErrorAC('Some error occurred'))
  }
  dispatch(setStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<AppActionsType>