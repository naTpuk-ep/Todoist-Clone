import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createTodo } from '../../redux/actions/actions';

import './App.scss';
import Header from '../Header';
import Nav from '../Nav';
import Main from '../../pages/Main';
import All from '../../pages/All';
import Today from '../../pages/Today';
import Upcoming from '../../pages/Upcoming';
import Modal from '../Modal';

function App(props) {
  const { todos, createTodo } = props;

  useEffect(() => {
    const prevTodos = localStorage.getItem('todos') || [];
    JSON.parse(prevTodos).forEach((el) => createTodo(el));
  }, [createTodo]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
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
