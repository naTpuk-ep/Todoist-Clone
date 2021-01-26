import React from 'react';
import TodoItem from '../TodoItem';

function TodoList(props) {
  const { todos, groupProps } = props;

  if (!todos.length) {
    return (
      <div className='TodoList'>
        <p>Todos not yet</p>
      </div>
    );
  }

  return (
    <div className='TodoList'>
      {todos.map((el, index) => (
        <TodoItem todo={el} key={index} />
      ))}
    </div>
  );
}

export default TodoList;
