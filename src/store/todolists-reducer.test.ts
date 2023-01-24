import {v1} from 'uuid';
import {TodoListType, FilterValuesType} from '../App';
import {
  AddTodoListAC,
  AddTodoListAT,
  ChangeTodoListFilterAT,
  ChangeTodoListTitleAT, RemoveTodoListAC,
  RemoveTodolistActionType,
  todolistsReducer
} from './todolists-reducer';

test('correct todolist should be removed', () => {
  //test data
  let todolistId1 = v1();
  let todolistId2 = v1();
  const startState: Array<TodoListType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]
  //testing
  // const action: RemoveTodolistActionType = RemoveTodoListAC(todolistId1)
  const endState = todolistsReducer(startState, RemoveTodoListAC(todolistId1))
  //result
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
  //
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]
  //
  const action: AddTodoListAT={
    type: 'ADD-TODOLIST',
    title: newTodolistTitle
  }
  const endState = todolistsReducer(startState, AddTodoListAC(newTodolistTitle) )
  //
  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
});
test('correct todolist should change its name', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]

  const action: ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: newTodolistTitle,
    id: todolistId2
  }
  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newFilter: FilterValuesType = "completed";

  const startState: Array<TodoListType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]
  const action: ChangeTodoListFilterAT={
    type: 'CHANGE-TODOLIST-FILTER',
    filter: newFilter,
    id: todolistId2

  }

  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});