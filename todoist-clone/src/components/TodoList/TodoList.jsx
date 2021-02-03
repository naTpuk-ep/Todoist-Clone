import React from 'react';
import TodoItem from '../TodoItem';
import keepCalm from '../../assets/img/calm.png';

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import './TodoList.scss';

function TodoList(props) {
  const { todos, getDayTodos } = props;

  const todoData = todos ? todos : getDayTodos;

  if (!todoData.length) {
    return (
      <div className='TodoList empty'>
        <img src={keepCalm} alt='calm' />
        <p>Enjoy your freetime</p>
      </div>
    );
  }

  return (
    <div className='TodoList'>
      <TransitionGroup>
        {todoData.map((el, index) => (
          <CSSTransition key={index} timeout={300} classNames='item'>
            <TodoItem todo={el} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

export default TodoList;
