import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { auth } from '../../persistance/network';
import { REACT_APP_BASE_URL } from '../App/App';
import { authorizate } from '../../redux/actions/actions';
import { Redirect } from 'react-router-dom';

import './Login.scss';

function Login(props) {
  const { authorizate, authState } = props;

  const [loginData, setloginData] = useState({
    username: '',
    password: '',
  });

  const [reason, setReason] = useState('');

  const loginHandler = async () => {
    const res = await auth.login(loginData);
    if (res.statusCode === 200) {
      authorizate(true);
    } else {
      setReason(res.reason);
      setloginData({
        username: '',
        password: '',
    });
    }
  };

  const changeHandler = (e) => {
    setReason('');
    const { name, value } = e.target;
    setloginData(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const registerHandler = async () => {
    const auth = await axios.post(
      `${REACT_APP_BASE_URL}/auth/register`,
      loginData,
    );
    if (auth.data.statusCode === 200) {
      loginHandler();
    } else {
      setReason(auth.data.reason);
    }
  };

  return authState ? (
    <Redirect to='/' />
  ) : (
    <div className='login'>
      <input
        value={loginData.username}
        type='text'
        name='username'
        placeholder='User name'
        onChange={changeHandler}
      />
      <input
      value={loginData.password}
        type='password'
        name='password'
        placeholder='Password'
        onChange={changeHandler}
      />
      <button onClick={loginHandler}>Login</button>
      {/* <button onClick={testHandler}>Test</button> */}
      <button onClick={registerHandler}>Register</button>
      {reason ? <span className='reason'>{reason}</span> : null}
    </div>
  );
}

const mapDispatchToProps = {
  authorizate,
};

export default connect(null, mapDispatchToProps)(Login);
