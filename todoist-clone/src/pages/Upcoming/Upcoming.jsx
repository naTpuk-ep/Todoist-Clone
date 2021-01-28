import React from 'react';
import './Upcoming.scss';
import TodoList from '../../components/TodoList';

function Upcoming(props) {
  const { todos, getToday } = props;

  let upcomingTodos = todos.filter((el) => el.date !== getToday());

  return (
    <div className='Upcoming'>
      <TodoList todos={upcomingTodos} />
    </div>
  );
}

export default Upcoming;
