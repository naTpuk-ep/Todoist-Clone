import React from 'react';

import './Today.scss';

import TodoList from '../../components/TodoList';

function Today(props) {
  const { todos, getToday } = props;

  let todayTodos = todos.filter((el) => el.date === getToday());

  return (
    <div className='Today'>
      <TodoList todos={todayTodos} />
    </div>
  );
}

export default Today;
