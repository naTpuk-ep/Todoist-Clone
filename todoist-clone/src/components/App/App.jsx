import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  authorizate,
  createTodo,
  showModal,
  closeModal,
  showNav,
  closeNav,
  getTodos,
} from '../../redux/actions/actions';

import './App.scss';

import Header from '../Header';
import Nav from '../Nav';
import Main from '../../pages/Main';
import Today from '../../pages/Today';
import Modal from '../Modal';
import Spinner from '../Spinner';
import Login from '../Login';
import { auth } from '../../persistance/network';
import Month from '../../pages/Month';
import Week from '../../pages/Week';

require('dotenv').config();

export const { REACT_APP_BASE_URL } = process.env;

function App(props) {
  const {
    todos,
    getTodos,
    modalClassName,
    navClassName,
    overlayClassName,
    showModal,
    closeModal,
    showNav,
    closeNav,
    authState,
    authorizate,
  } = props;

  const testAuth = async () => {
    const res = await auth.test();
    if (res.statusCode === 200) {
      authorizate(true);
    } else {
      console.log('Authorizate to continue');
      authorizate(false);
    }
  };

  testAuth();

  useEffect(() => {
    getTodos();
  }, [getTodos, authState]);

  const getToday = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return (today = `${yyyy}-${mm}-${dd}`);
  };

  const getDay = (day) => {
    return day.getDay() === 0 ? 7 : day.getDay();
  };

  const dayOfFirst = getDay(
    new Date(
      new Date(getToday()).getFullYear(),
      new Date(getToday()).getMonth(),
      1,
    ),
  );

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const shortDaysNames = [
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
    'SUN',
  ];

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  if (authState === null) {
    return <Spinner />;
  }

  if (authState && todos) {
    return (
      <React.Fragment>
        <BrowserRouter>
          <div className='App'>
            <Header showNav={showNav} showModal={showModal} />
            <Nav navClassName={navClassName} closeNav={closeNav} />
            <Modal
              modalClassName={modalClassName}
              closeModal={closeModal}
              getToday={getToday}
            />
            <Switch>
              <Route exact path='/'>
                <Main getToday={getToday} />
              </Route>

              <Route path='/today'>
                <Today todos={todos} getToday={getToday} />
              </Route>
              <Route path='/week'>
                <Week
                  todos={todos}
                  getToday={getToday}
                  dayOfFirst={dayOfFirst}
                  days={days}
                  getDay={getDay}
                />
              </Route>
              <Route path='/month'>
                <Month
                  todos={todos}
                  getToday={getToday}
                  dayOfFirst={dayOfFirst}
                  days={shortDaysNames}
                  months={months}
                  getDay={getDay}
                />
              </Route>

              <Route path='/login'>
                <Login authState={authState} />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
        <div
          className={overlayClassName}
          onClick={() => {
            closeModal();
            closeNav();
          }}
        ></div>
      </React.Fragment>
    );
  }

  return <Login />;
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.todos,
    authState: state.authState.authState,
    modalClassName:
      state.domElementsClassNames.domElementsClassNames.modal,
    navClassName:
      state.domElementsClassNames.domElementsClassNames.nav,
    overlayClassName:
      state.domElementsClassNames.domElementsClassNames.overlay,
  };
};

const mapDispatchToProps = {
  getTodos,
  createTodo,
  showModal,
  closeModal,
  showNav,
  closeNav,
  authorizate,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
