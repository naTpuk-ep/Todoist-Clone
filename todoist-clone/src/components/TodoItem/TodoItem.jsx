import React from 'react';
import { connect } from 'react-redux';
import {
  completeTodo,
  removeTodo,
} from '../../redux/actions/actions';
import './TodoItem.scss';

function TodoItem(props) {
  const { todo, removeTodo, completeTodo } = props;

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
          onChange={() => completeTodo(todo)}
        />
        <span className={titleClassName}>{todo.title}</span>
      </label>
      <i
        onClick={() => removeTodo(todo)}
        className='material-icons red-text'
      >
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
