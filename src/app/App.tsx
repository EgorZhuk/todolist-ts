import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {BrowserRouter, HashRouter} from 'react-router-dom';
import {
	CircularProgress,
} from '@mui/material';
import './App.css'
import { ErrorSnackbar, Header, Routing } from 'common/components'
import { useActions } from 'common/hooks';
import { selectIsInitialized } from 'app/app.selectors';
import { authThunks } from 'features/auth/auth.reducer';

function App() {

	const isInitialized = useSelector(selectIsInitialized)

	const {initializeApp} = useActions(authThunks)

	useEffect(() => {
		initializeApp({})
	}, [])

	if (!isInitialized) {
		return <div
			style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
			<CircularProgress/>
		</div>
	}

	return (
		<HashRouter>
			<div className="App">
				<ErrorSnackbar/>
				<Header/>
				<Routing/>
			</div>
		</HashRouter>
	)
}

export default App
