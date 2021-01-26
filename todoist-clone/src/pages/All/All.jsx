import React from 'react';
import './All.scss';

import TodoList from '../../components/TodoList';

function All(props) {
  const { todos, groupProps } = props;

  return (
    <div className='All'>
      <TodoList todos={todos} groupProps={groupProps} />
    </div>
  );
}

export default All;
