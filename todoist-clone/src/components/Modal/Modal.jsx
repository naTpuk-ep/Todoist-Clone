import React from 'react';
import { connect } from 'react-redux';
import { todosData } from '../../persistance/network';
import { createTodo } from '../../redux/actions/actions';

import './Modal.scss';

function Modal (props) {
  let title = '';

  const submitHandler = async (event) => {
    event.preventDefault();
    if (title.length) {
      const { createTodo } = props;
      const newTodo = {
        id: new Date().getTime(),
        title,
        done: false,
      };
      await todosData.create(newTodo);
      createTodo(newTodo);
      props.closeModal();
    } else {
      props.closeModal();
    }
  };

  const changeInputHandler = (event) => {
    title = event.target.value;
  };

  return (
    <div className='Modal'>
      <form onSubmit={submitHandler}>
        <label htmlFor='title'> Add new ToDo</label>
        <input
          type='text'
          id='title'
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
