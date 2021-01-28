import React from 'react';
import { connect } from 'react-redux';
import { todosData } from '../../persistance/network';
import {
  completeTodo,
  removeTodo,
} from '../../redux/actions/actions';
import './TodoItem.scss';

function TodoItem(props) {
  const { todo, removeTodo, completeTodo } = props;

  const completeHandler = async (e) => {
    await todosData.remove(todo);
    completeTodo(todo);
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
