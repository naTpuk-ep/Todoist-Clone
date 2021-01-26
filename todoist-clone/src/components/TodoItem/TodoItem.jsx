import React from 'react';
import { connect } from 'react-redux';
import { todosData } from '../../persistance/network';
import { completeTodo } from '../../redux/actions/actions';
import './TodoItem.scss';

function TodoItem(props) {
  const { todo, completeTodo } = props;
  console.log(todo);

  const completeHandler = async (e) => {
    await todosData.remove(todo);
    completeTodo(todo);
  }

  return (
    <div className='TodoItem'>
      <label>
        <input type='checkbox' />
        <span id='title'>{todo.title}</span>
        <i
          onClick={completeHandler}
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
