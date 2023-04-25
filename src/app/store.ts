import { tasksReducer } from 'features/todolists-list/tasks/tasks.reducer';
import { todolistsReducer } from 'features/todolists-list/todolists/todolists.reducer';
import { AnyAction, combineReducers } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { appReducer } from 'app/app.reducer'
import { authReducer } from 'features/auth/auth.reducer'
import { configureStore } from '@reduxjs/toolkit';
import {securityReducer} from 'features/auth/secure/secure.reducer';


const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReducer,
	auth: authReducer,
	security: securityReducer
})

export const store = configureStore({
	reducer: rootReducer,
})


export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

// @ts-ignore
window.store = store;
