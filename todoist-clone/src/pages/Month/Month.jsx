import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from '../../components/TodoList';
import { setMonthView } from '../../redux/actions/actions';
import './Month.scss';

function Month(props) {
  const { todos, getToday, days, months, getDay } = props;

  const [tableDate, setTableDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  const dispatch = useDispatch();
  const currDate = useSelector((state) => state.view.monthDate);

  const dayOfFirst = getDay(
    new Date(tableDate.year, tableDate.month, 1),
  );

  const daysInMonth =
    32 - new Date(tableDate.year, tableDate.month, 32).getDate();

  const getMonthsTodos = () => {
    const monthTodos = [];
    for (let i = 0; i < daysInMonth; i++) {
      monthTodos[i] = {
        numberOfTodos: 0,
        todos: [],
      };
      todos.forEach((todo) => {
        if (
          new Date(todo.date).getFullYear() === tableDate.year &&
          new Date(todo.date).getMonth() === tableDate.month &&
          new Date(todo.date).getDate() === i + 1
        ) {
          monthTodos[i].numberOfTodos += 1;
          monthTodos[i].todos.push(todo);
        }
      });
    }
    return monthTodos;
  };

  const setDatesToTable = () =>
    days.map((day, i) =>
      i === dayOfFirst - 1 ? (
        getMonthsTodos().map((dayTodos, j) => (
          <div key={j + i} className='date'>
            <span className='number'>{`${j + 1}`}</span>
            <span
              className={`todos ${
                dayTodos.todos.some(
                  (todo) =>
                    !todo.completed &&
                    new Date(todo.date).getTime() <
                      new Date(getToday()).getTime(),
                )
                  ? 'past'
                  : ''
              }`}
            >
              {Boolean(dayTodos.numberOfTodos)
                ? dayTodos.numberOfTodos
                : null}
            </span>
          </div>
        ))
      ) : (
        <div key={i} className='date'>
          {null}
        </div>
      ),
    );

  const setDaysToTable = () =>
    days.map((day, i) => (
      <div key={i} className='day'>
        {day}
      </div>
    ));

  const clickHandler = (e) => {
    const clickDate = {
      year: tableDate.year,
      month: tableDate.month,
    };
    if (e.target.className === 'date') {
      if (e.target.innerHTML !== '') {
        clickDate.date = parseFloat(e.target.firstChild.textContent);
      }
    } else {
      clickDate.date = parseFloat(
        e.target.parentElement.firstChild.textContent,
      );
    }
    clickDate.todos = todos.filter(
      (todo) =>
        new Date(todo.date).getFullYear() === clickDate.year &&
        new Date(todo.date).getMonth() === clickDate.month &&
        new Date(todo.date).getDate() === clickDate.date,
    );
    if (e.target.innerHTML !== '') dispatch(setMonthView(clickDate));
  };

  if (currDate) {
    currDate.todos = todos.filter(
      (todo) =>
        new Date(todo.date).getFullYear() === currDate.year &&
        new Date(todo.date).getMonth() === currDate.month &&
        new Date(todo.date).getDate() === currDate.date,
    );
  }

  const backHandler = () => {
    dispatch(setMonthView(null));
  };

  const nextHandler = () => {
    setTableDate((state) => ({
      ...state,
      month: tableDate.month === 11 ? 0 : tableDate.month + 1,
    }));
  };

  const prevHandler = () => {
    setTableDate((state) => ({
      ...state,
      month: tableDate.month === 0 ? 11 : tableDate.month - 1,
    }));
  };

  return (
    <div className='Month'>
      {currDate ? (
        <React.Fragment>
          <div className='month-header current-day'>
            <button className='btn-back' onClick={backHandler}>
              <i className='material-icons'>keyboard_backspace</i>
            </button>
            <h3>
              {currDate.date} {months[tableDate.month]}{' '}
              {currDate.year}
            </h3>
          </div>
          <TodoList todos={currDate.todos} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className='month-header'>
            <button className='btn-prev' onClick={prevHandler}>
              <i className='material-icons'>keyboard_arrow_left</i>
            </button>
            <h3>{months[tableDate.month]}</h3>
            <button className='btn-next' onClick={nextHandler}>
              <i className='material-icons'>keyboard_arrow_right</i>
            </button>
          </div>
          <div className='calendar'>
            <div className='days'>{setDaysToTable()}</div>
            <div className='dates' onClick={clickHandler}>
              {setDatesToTable()}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default Month;
