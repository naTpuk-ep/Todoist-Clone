import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { todosData } from '../../persistance/network';
import {
  completeTodo,
  removeTodo,
} from '../../redux/actions/actions';
import './TodoItem.scss';

function TodoItem(props) {
  const { todo, removeTodo, completeTodo } = props;

  useEffect(() => {
    todosData.save(todo)
  }, [todo]);

  const completeHandler = async (e) => {
    completeTodo(todo);
  };

  const removeHandler = async () => {
    removeTodo(todo);
    await todosData.remove(todo);
  }

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
      </label>
      <i
        onClick={removeHandler}
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
