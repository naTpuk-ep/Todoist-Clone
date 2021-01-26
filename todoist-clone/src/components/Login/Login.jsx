import axios from 'axios';
import React from 'react';
import { REACT_APP_BASE_URL } from '../App/App';
import { auth } from '../../persistance/network';

import './Login.scss';

function Login () {
	
	const loginData = {
		username: '',
		password: '',
	}

	const testData = {
		result: ''
	}

	const loginHandler = async () => {
		console.log('login');

		const res = await auth.login(loginData);
		if (res.statusCode !== 200) {
			console.log(res.reason);
		}
	}

	const changeHandler = (e) => {
		loginData[e.target.name] = e.target.value;
	}

	const testHandler = async () => {
		const result = await auth.test();

		testData.result = result.statusCode === 200 ? 'ok' : 'fail';
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