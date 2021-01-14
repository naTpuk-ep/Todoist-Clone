import React from 'react';
import TodoItem from '../TodoItem';
import { connect } from 'react-redux';

function TodoList(props) {
  const { todos } = props;

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

const mapStateToProps = (state) => {
  return {
    todos: state.todos.todos,
  };
};

export default connect(mapStateToProps)(TodoList);
