import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {AppRootStateType, useAppDispatch, useAppSelector} from './store';
import {RequestStatusType} from './app-reducer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Login} from '../features/Login/Login';
import {Navigate, Route, Routes} from 'react-router-dom';
import {CircularProgress} from '@mui/material';
import {initializeAppTC, logoutTC} from '../features/Login/auth-reducer';


function App() {
  const status = useAppSelector<RequestStatusType>((state) => state.app.status);

  const initialized = useAppSelector(state => state.app.initialized);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  const logoutHandler = useCallback(()=>{
    dispatch(logoutTC())
  },[])

  if (!initialized) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>;
  }

  return (
    <div className="App">
      <ErrorSnackbar/>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            TodoList
          </Typography>
          {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Log Out</Button>}
        </Toolbar>
        {status === 'loading' && <LinearProgress/>}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={'/'} element={<TodolistsList/>}/>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'*'} element={<Navigate to={'/404'}/>}/>
          <Route path={'/404'}
                 element={<h1 style={{textAlign: 'center', textTransform: 'uppercase'}}>Page not found 404</h1>}/>
        </Routes>


      </Container>
    </div>
  );
}

export default App;
