import React, { useState } from 'react';
import { connect } from 'react-redux';
import { todosDB } from '../../persistance/network';
import {
  completeTodo,
  removeTodo,
} from '../../redux/actions/actions';

import './TodoItem.scss';

function TodoItem(props) {
  const { todo, removeTodo, completeTodo } = props;

  const [currTodo, setCurrTodo] = useState(todo);

  if (currTodo !== todo) {
    todosDB.save(todo);
    setCurrTodo(todo);
  }

  const completeHandler = (e) => {
    completeTodo(todo);
  };

  const removeHandler = () => {
    removeTodo(todo);
  };

  let titleClassName = 'title';
  if (todo.completed) {
    titleClassName += ' completed';
  }

  return (
    <div className='TodoItem'>
      <label>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={completeHandler}
        />
        <span className={titleClassName}>{todo.title}</span>
        <span>{todo.date}</span>
      </label>
      <i onClick={removeHandler} className='material-icons red-text'>
        delete
      </i>
    </div>
  );
}

const mapDispatchToProps = {
  removeTodo,
  completeTodo,
};

export default connect(null, mapDispatchToProps)(TodoItem);
