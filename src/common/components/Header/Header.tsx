import React from 'react';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {useSelector} from 'react-redux';
import {selectAppStatus} from 'app/app.selectors';
import {selectIsLoggedIn} from 'features/auth/auth.selectors';
import {useActions} from 'common/hooks';
import {authThunks} from 'features/auth/auth.reducer';


export const Header = () => {
  const status = useSelector(selectAppStatus)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const {logout} = useActions(authThunks)
  const logoutHandler = () => logout({})
  return (
    <div>
      <AppBar position="static">
        <Container fixed>
          <Toolbar sx={{justifyContent: 'space-between'}}>
            <Typography  variant="h3">
              TodoList
            </Typography>
            {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
          </Toolbar>
        </Container>

        {status === 'loading' && <LinearProgress/>}
      </AppBar>
    </div>
  );
};
