import React, { useState } from 'react';
import { connect } from 'react-redux';
import { todosData } from '../../persistance/network';
import { createTodo } from '../../redux/actions/actions';

import './Modal.scss';

function Modal(props) {
  const { createTodo, modalClassName } = props;

  const [title, setTitle] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    if (title.length) {
      const newTodo = {
        id: new Date().getTime(),
        title,
        completed: false,
      };
      await todosData.create(newTodo);
      createTodo(newTodo);
      setTitle('');
      props.closeModal();
    }
  };

  const changeInputHandler = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div className={modalClassName}>
      <form onSubmit={submitHandler}>
        <label htmlFor='title'> Add new ToDo</label>
        <input
          type='text'
          id='title'
          value={title}
          name='title'
          onChange={changeInputHandler}
        />
        <button type='submit'>
          <i className='material-icons red-text'>done</i>
        </button>
      </form>
    </div>
  );
}

const mapDispatchToProps = {
  createTodo,
};

export default connect(null, mapDispatchToProps)(Modal);
