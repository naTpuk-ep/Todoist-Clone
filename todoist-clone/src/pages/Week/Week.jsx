import React from 'react';
import TodoList from '../../components/TodoList';

import './Week.scss';

function Week(props) {
  const { todos, getToday, days, getDay } = props;

  const checkDates = (date1, date2) =>
    date1.getTime() === date2.getTime();

  const getDayTodos = (date) =>
    todos.filter((todo) => checkDates(new Date(todo.date), date));

  const getDaysOfWeek = (current) => {
    var week = [];
    var first = current.getDate() - current.getDay() + 1;
    for (var i = 0; i < 7; i++) {
      week.push(new Date(current.setDate(first++)));
    }
    return week;
  };

  const addZero = (n) => {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
  };

  return (
    <div className='Week'>
      {getDaysOfWeek(new Date(getToday())).map((day) => {
        return (
          <div
            key={day.getTime()}
            id={day.toISOString()}
            className='day'
          >
            <h3>
              {days[getDay(day) - 1]}, {addZero(day.getDate())}.
              {addZero(day.getMonth() + 1)}
            </h3>
            <TodoList getDayTodos={getDayTodos(day)} />
          </div>
        );
      })}
    </div>
  );
}

export default Week;
