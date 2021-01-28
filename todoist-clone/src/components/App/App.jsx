import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  authorizate,
  createTodo,
  showModal,
  closeModal,
  showNav,
  closeNav,
} from '../../redux/actions/actions';

import './App.scss';
import Header from '../Header';
import Nav from '../Nav';
import Main from '../../pages/Main';
import All from '../../pages/All';
import Today from '../../pages/Today';
import Upcoming from '../../pages/Upcoming';
import Modal from '../Modal';
import Login from '../Login';
import Register from '../Register';
import { auth, todosData } from '../../persistance/network';

require('dotenv').config();

export const { REACT_APP_BASE_URL } = process.env;

function App(props) {
  const {
    todos,
    createTodo,
    modalClassName,
    navClassName,
    showModal,
    closeModal,
    showNav,
    closeNav,
    authState,
    authorizate,
  } = props;

  console.log(authState);

  const groupProps = useMemo(() => {
    return {
      appear: true,
      enter: true,
      exit: true,
    };
  }, []);

  const startLogin = useMemo (() => (
    <Login />
  ), []);

  const TheApp = useMemo(() => {
    return (
      <React.Fragment>
      <BrowserRouter>
        <div className='App'>
          <Header showNav={showNav} showModal={showModal} />
          <Nav navClassName={navClassName} closeNav={closeNav} />
          <Modal
            modalClassName={modalClassName}
            closeModal={closeModal}
          />
          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route path='/all'>
              <All todos={todos} groupProps={groupProps} />
            </Route>
            <Route path='/today'>
              <Today />
            </Route>
            <Route path='/upcoming'>
              <Upcoming />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
      <div className='overlay'></div>
    </React.Fragment>
    )
  }, [closeModal, closeNav, groupProps, modalClassName, navClassName, showModal, showNav, todos]) 

  useEffect(() => {
    (async () => {
      const data = await auth.test();
      if (data.statusCode === 200) {
        setStart(TheApp)
      } else {
        setStart(startLogin)
      }
    })()
  }, [TheApp, startLogin]);
  

  useEffect(() => {
    console.log('auth');
  }, [authorizate]);

  const [start, setStart] = useState(null);


  if (start === null) {
    return <h1>Load</h1>;
  }

  return start;
}







const mapStateToProps = (state) => {
  return {
    todos: state.todos.todos,
    modalClassName:
      state.domElementsClassNames.domElementsClassNames.modal,
    navClassName:
      state.domElementsClassNames.domElementsClassNames.nav,
  };
};

const mapDispatchToProps = {
  createTodo,
  showModal,
  closeModal,
  showNav,
  closeNav,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);