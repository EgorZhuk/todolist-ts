import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';
import {ADD_TODOLIST, CHANGE_TODOLIST_FILTER, CHANGE_TODOLIST_TITLE, REMOVE_TODOLIST} from './constants';



export type RemoveTodolistActionType = {
  type: typeof REMOVE_TODOLIST
  id: string
}

export type AddTodoListAT = {
  type: typeof ADD_TODOLIST
  title: string
}

export type ChangeTodoListTitleAT = {
  type: typeof CHANGE_TODOLIST_TITLE
  title: string
  id: string
}

export type ChangeTodoListFilterAT = {
  type: typeof CHANGE_TODOLIST_FILTER
  filter: FilterValuesType
  id: string
}

type ActionType = RemoveTodolistActionType |
  AddTodoListAT |
  ChangeTodoListTitleAT |
  ChangeTodoListFilterAT

export const todolistsReducer = (
  todolists: Array<TodoListType>,
  action: ActionType): Array<TodoListType> => {

  switch (action.type) {

    case 'REMOVE-TODOLIST':
      return todolists.filter(tl => tl.id !== action.id);

    case 'ADD-TODOLIST':
      const newTodolistId = v1();
      const newTodoList: TodoListType = {
        id: newTodolistId,
        title: action.title,
        filter: 'all'
      };
      return [...todolists, newTodoList];

    case 'CHANGE-TODOLIST-TITLE':
      return todolists.map(t => t.id === action.id ? {...t, title: action.title} : t);

    case 'CHANGE-TODOLIST-FILTER':
      return todolists.map(t => t.id === action.id ? {...t, filter: action.filter} : t);

    default:
      return todolists;
  }
};

export const RemoveTodoListAC= (id: string): RemoveTodolistActionType =>({
  type: REMOVE_TODOLIST, id
})

export const AddTodoListAC= (title: string): AddTodoListAT =>({
  type: ADD_TODOLIST, title
})