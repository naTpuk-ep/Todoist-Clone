import React from 'react';

import './All.scss';

import TodoList from '../../components/TodoList';

function All(props) {
  const { todos } = props;

  return (
    <div className='All'>
      <TodoList todos={todos} />
    </div>
  );
}

export default All;
