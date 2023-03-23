import { Dispatch } from 'redux'
import {SetAppErrorActionType, setAppInitializedAC, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer';
import {authAPI} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;

const initialState = {
  isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: any) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.login(data)
    .then((res)=>{
      if (res.data.resultCode ===0){
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err)=>{
      handleServerNetworkError(err,dispatch)
    })
  dispatch(setAppStatusAC('loading'))
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.logout()
    .then((res)=>{
      if (res.data.resultCode ===0){
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC('idle'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err)=>{
      handleServerNetworkError(err,dispatch)
    })
  dispatch(setAppStatusAC('loading'))
}
export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true))

    } else {
    }
    dispatch(setAppInitializedAC(true));
  })
}
// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType