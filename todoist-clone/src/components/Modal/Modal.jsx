import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTodo } from '../../redux/actions/actions';

import useSound from 'use-sound';
import successSound from '../../assets/sounds/success_sound.mp3';

import './Modal.scss';

function Modal(props) {
  const { createTodo, modalClassName, getToday } = props;

  const [title, setTitle] = useState('');
  const [date, setDate] = useState();

  const [playSuccess] = useSound(successSound, {
    volume: 0.25,
  });

  const submitHandler = async (event) => {
    event.preventDefault();

    if (title.length) {
      const defaultDate = [...event.target.childNodes].find(
        (el) => el.id === 'date',
      ).defaultValue;

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

      [...event.target.childNodes].find(
        (el) => el.id === 'date',
      ).value = defaultDate;

      playSuccess();
    }
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
          className='title-input'
          onChange={changeInputTitleHandler}
        />
        <input
          id='date'
          type='date'
          className='date-input'
          defaultValue={getToday()}
          onChange={changeInputDateHandler}
        />
        <div className='btns-block'>
          <button type='submit'>
            <i className='material-icons'>done</i>
          </button>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = {
  createTodo,
};

export default connect(null, mapDispatchToProps)(Modal);
