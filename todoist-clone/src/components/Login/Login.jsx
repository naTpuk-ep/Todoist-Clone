import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../persistance/network';
import { REACT_APP_BASE_URL } from '../App/App';
import { authorizate } from '../../redux/actions/actions';
import { Redirect } from 'react-router-dom';

import './Login.scss';

function Login(props) {
  const { authorizate, authState } = props;

  // const [loginData, setLoginData] = useState({
  // 	username: '',
  // 	password: '',
  // })

  const loginData = {
    username: '',
    password: '',
  };

  const testData = {
    result: '',
  };

  const loginHandler = async () => {
    const res = await auth.login(loginData);
    if (res.statusCode === 200) {
      authorizate(true);
    } else {
      console.log(res.reason);
    }
  };

  const changeHandler = (e) => {
    loginData[e.target.name] = e.target.value;
  };

  const testHandler = async () => {
    const result = await auth.test();
    testData.result = result.statusCode === 200 ? 'ok' : 'fail';
    console.log(testData.result);
  };

  const registerHandler = async () => {
    const auth = await axios.post(
      `${REACT_APP_BASE_URL}/auth/register`,
      loginData,
    );
    if (auth.data.statusCode === 200) {
      loginHandler();
    } else {
      console.log(auth.data.reason);
    }
  };

  return authState ? (
    <Redirect to='/' />
  ) : (
    <div className='login'>
      <input
        type='text'
        name='username'
        placeholder='User name'
        onChange={changeHandler}
      />
      <input
        type='text'
        name='password'
        placeholder='Password'
        onChange={changeHandler}
      />
      <button onClick={loginHandler}>Login</button>
      <button onClick={testHandler}>Test</button>
      <button onClick={registerHandler}>Register</button>
    </div>
  );
}

const mapDispatchToProps = {
  authorizate,
};

export default connect(null, mapDispatchToProps)(Login);
