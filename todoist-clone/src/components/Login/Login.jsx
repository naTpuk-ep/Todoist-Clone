import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../persistance/network';
import {authorizate} from '../../redux/actions/actions';

import './Login.scss';

function Login (props) {

	const {authorizate} = props;
	
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
		if (res.statusCode === 200) {
			authorizate(true);
		} else {
			console.log(res.reason);
		}
	}

	const logoutHandler = () => {
		auth.setToken(undefined);
		authorizate(false);
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
			<button onClick={logoutHandler}>Logout</button>
		</div>
	)
}

const mapDispatchToProps = {
  authorizate
};

export default connect(null, mapDispatchToProps)(Login);