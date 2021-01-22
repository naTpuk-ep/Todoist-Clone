import axios from 'axios';
import React from 'react';
import { REACT_APP_BASE_URL } from '../App/App';

import './Login.scss';

function Login () {

	let token = undefined;
	
	const loginData = {
		username: '',
		password: '',
	}

	const testData = {
		result: ''
	}

	const loginHandler = async () => {
		console.log('login');

		const headers = {Authorization: token};
		const auth = await axios.post(`${REACT_APP_BASE_URL}/auth/login`, loginData, {headers});

		if (auth.data.statusCode === 200) {
			token = auth.data.token;
		} else {
			console.log(auth.data.reason);
		}
	}

	const changeHandler = (e) => {
		loginData[e.target.name] = e.target.value;
	}

	const testHandler = async () => {
		const headers = {Authorization: token};
		const result = await axios.post(`${REACT_APP_BASE_URL}/auth/test`, undefined, {headers});

		testData.result = result.data.statusCode === 200 ? 'ok' : 'fail';
		console.log(testData.result);
	}


	return (
		<div className='login'>
			<input type='text' name='username' placeholder='User name' onChange={changeHandler}/>
			<input type='text' name='password' placeholder='Password' onChange={changeHandler}/>
			{/* <input type='submit' value='Login' onClick={loginHandler}/> */}
			<button onClick={loginHandler}>Login</button>
			<button onClick={testHandler}>Test</button>
		</div>
	)
}

export default Login;