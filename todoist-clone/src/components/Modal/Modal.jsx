import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTodo } from '../../redux/actions/actions';

import './Modal.scss';

function Modal(props) {
  const { createTodo, modalClassName, getToday } = props;

  const [title, setTitle] = useState('');
  const [date, setDate] = useState();

  const submitHandler = async (event) => {
    event.preventDefault();
    const defaultDate = [...event.target.childNodes].find(
      (el) => el.id === 'date',
    ).defaultValue;

    if (title.length) {
      const newTodo = {
        id: new Date().getTime(),
        title,
        date: date || defaultDate,
        completed: false,
      };
      createTodo(newTodo);
      setTitle('');
      setDate();
      props.closeModal();
    } else {
      props.closeModal();
    }

    [...event.target.childNodes].find(
      (el) => el.id === 'date',
    ).value = defaultDate;
  };

  const changeInputTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const changeInputDateHandler = (event) => {
    event.preventDefault();
    setDate(event.target.value);
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
          onChange={changeInputTitleHandler}
        />
        <input
          id='date'
          type='date'
          defaultValue={getToday()}
          onChange={changeInputDateHandler}
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
