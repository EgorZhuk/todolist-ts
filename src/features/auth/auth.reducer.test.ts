import { authThunks, authReducer} from './auth.reducer';

type StartStateType = {
  isLoggedIn: boolean,
}

let startState = {} as StartStateType
beforeEach(() => {
  startState= {
    isLoggedIn: false,
  };
});
test('on login, isLoggedIn should be true', ()=>{

  const endState = authReducer(
    startState,
    authThunks.login.fulfilled(
      {isLoggedIn:true},
      '',
      {email:'', password: '', rememberMe:true, captcha:''}))
  expect(endState.isLoggedIn).toBeTruthy()
})

test('on logout, isLogedIn should be false', ()=>{
  const endState = authReducer(startState, authThunks.logout.fulfilled({isLoggedIn:false}, ''))
  expect(endState.isLoggedIn).toBeFalsy()
})

test('on initialize application, isInitialized should be true', ()=>{

  const endState = authReducer(startState, authThunks.initializeApp.fulfilled({isLoggedIn:true}, ''))

  expect(endState.isLoggedIn).toBeTruthy()
})
