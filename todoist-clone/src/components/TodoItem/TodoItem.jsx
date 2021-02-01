import React, { useState } from 'react';
import { connect } from 'react-redux';
import { todosDB } from '../../persistance/network';
import {
  completeTodo,
  removeTodo,
} from '../../redux/actions/actions';

import useSound from 'use-sound';
import completeSound from '../../assets/sounds/complete_sound.mp3';
import deleteSound from '../../assets/sounds/delete_sound.mp3';

import './TodoItem.scss';

function TodoItem(props) {
  const { todo, removeTodo, completeTodo } = props;
  const [currTodo, setCurrTodo] = useState(todo);

  const [playComplete] = useSound(completeSound, {
    volume: 0.25,
  });
  const [playRemove] = useSound(deleteSound, {
    volume: 0.5,
  });

  if (currTodo !== todo) {
    todosDB.save(todo);
    setCurrTodo(todo);
  }

  const completeHandler = (e) => {
    completeTodo(todo);
    playComplete();
  };

  const removeHandler = () => {
    removeTodo(todo);
    playRemove();
  };

  let titleClassName = 'todo-title';
  if (todo.completed) {
    titleClassName += ' completed';
  }

  return (
    <div className='TodoItem'>
      <label>
        <input
          className='todo-marker'
          type='checkbox'
          checked={todo.completed}
          onChange={completeHandler}
        />
        <span className={titleClassName}>{todo.title}</span>
      </label>

      <span className='todo-date'>
        {todo.date.split('-').reverse().join('-')}
      </span>

      <i onClick={removeHandler} className='material-icons'>
        clear
      </i>
    </div>
  );
}

const mapDispatchToProps = {
  removeTodo,
  completeTodo,
};

export default connect(null, mapDispatchToProps)(TodoItem);
