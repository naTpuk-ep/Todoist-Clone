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
    authorizate
  } = props;

  const groupProps = {
    appear: true,
    enter: true,
    exit: true,
  };

  const testAuth = async () => {
    const res = await auth.test();
    console.log('test');
    if (res.statusCode === 200) {
      authorizate(true);
    }
  }

  testAuth();

  if (authState) {
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
          <Redirect to="/" />
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
          </Switch>
        </div>
      </BrowserRouter>
      <div className='overlay'></div>
    </React.Fragment>
    );
  } else {
    return <Login />
  }
}





const mapStateToProps = (state) => {
  return {
    todos: state.todos.todos,
    authState: state.authState.authState,
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
  authorizate,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);