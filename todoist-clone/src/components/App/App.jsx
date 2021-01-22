import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createTodo } from '../../redux/actions/actions';
import axios from 'axios';

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

require('dotenv').config();
export const { REACT_APP_USER_ID, REACT_APP_BASE_URL } = process.env;

function App(props) {
  const { todos, createTodo } = props;

  useEffect(() => {
    const getDB = async () => {
      try {
        const res = await axios.get(`${REACT_APP_BASE_URL}/todoist/${REACT_APP_USER_ID}`);
        // console.log(res.data);
        const prevTodos = res.data.data || '[]';
        JSON.parse(prevTodos).forEach((el) => createTodo(el));
        // console.log('get');
      } catch (e) {
        console.log(e.message);
      }
    }
    getDB();
  }, [createTodo]);

  useEffect(() => {
    const updateDB = async (data) => {
      try {
        await axios.put(`${REACT_APP_BASE_URL}/todoist/${REACT_APP_USER_ID}`, {data: JSON.stringify(data)});
        const res = await axios.get(`${REACT_APP_BASE_URL}/todoist`);
        console.log('put', res.data);
        // console.log(JSON.parse(res.data[res.data.length - 1].data));
        // console.log('put');
      } catch(e) {
        console.log(e.message);
      }
    }
    updateDB(todos);

  }, [todos]);

  const showModal = () => {
    const modal = document.querySelector('.Modal');
    modal.classList.add('Modal_show');
  };

  const closeModal = () => {
    const modal = document.querySelector('.Modal');
    modal.classList.remove('Modal_show');
  };

  return (
    <BrowserRouter>
      <div className='App'>
        <Header showModal={showModal} />
        <Nav />
        <Modal closeModal={closeModal} />
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/all'>
            <All />
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
  );
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.todos,
  };
};

const mapDispatchToProps = {
  createTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);