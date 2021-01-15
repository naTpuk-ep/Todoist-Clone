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

function App(props) {
  const { todos, createTodo } = props;
  const userId = '422e742a-e729-4889-94e7-44327f68e68f';
  const dbUrl = `https://rs-clone-be.herokuapp.com/todoist`;

  useEffect(() => {
    const prevTodos = localStorage.getItem('todos') || [];
    JSON.parse(prevTodos).forEach((el) => createTodo(el));

    const getDB = async () => {
      try {
        const res = await axios.get(`${dbUrl}/${userId}`)
        console.log(res.data);
        const prevTodos = res.data.data || '[]';
        JSON.parse(prevTodos).forEach((el) => createTodo(el));
        console.log('get');
      } catch (e) {
        console.log(e.message);
      }
    }
    getDB();
  }, [createTodo, dbUrl]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));

    const updateDB = async (data) => {
      try {
        await axios.put(`${dbUrl}/${userId}`, {data: JSON.stringify(data)});
        const res = await axios.get(dbUrl);
        console.log(res.data);
        console.log(JSON.parse(res.data[res.data.length - 1].data));
        console.log('put');
      } catch(e) {
        console.log(e.message);
      }
    }
    updateDB(todos);

  }, [todos, dbUrl]);

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
