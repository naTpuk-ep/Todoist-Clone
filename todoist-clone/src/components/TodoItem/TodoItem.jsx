import React from 'react';
import { connect } from 'react-redux';
import { completeTodo } from '../../redux/actions/actions';
import './TodoItem.scss';

function TodoItem(props) {
  const { todo, completeTodo } = props;

  return (
    <div className='TodoItem'>
      <label>
        <input type='checkbox' />
        <span id='title'>{todo.title}</span>
        <i
          onClick={() => completeTodo(todo)}
          className='material-icons red-text'
        >
          delete
        </i>
      </label>
    </div>
  );
}

const mapDispatchToProps = {
  completeTodo,
};

export default connect(null, mapDispatchToProps)(TodoItem);
