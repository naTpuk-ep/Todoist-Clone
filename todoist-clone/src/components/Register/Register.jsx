import axios from 'axios';
import React from 'react';
import { REACT_APP_BASE_URL } from '../App/App';

import './Register.scss';

function Register () {
	
	const registerData = {
		username: '',
		password: '',
	}

	const registerHandler = async () => {
		console.log('register');

		const auth = await axios.post(`${REACT_APP_BASE_URL}/auth/register`, registerData);
		console.log(auth.data);
	}

	const changeHandler = (e) => {
		registerData[e.target.name] = e.target.value;
	}


	return (
		<div className='register'>
			<input type='text' name='username' placeholder='User name' onChange={changeHandler}/>
			<input type='text' name='password' placeholder='Password' onChange={changeHandler}/>
			{/* <input type='submit' value='Login' onClick={registerHandler}/> */}
			<button onClick={registerHandler}>Register</button>
		</div>
	)
}

export default Register;