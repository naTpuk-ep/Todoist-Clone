import { todosDB } from '../../persistance/network';

export function setMonthView(monthView) {
  return {
    type: 'MONTH_VIEW',
    payload: monthView,
  }
}

export function setWeekView(weekView) {
  return {
    type: 'WEEK_VIEW',
    payload: weekView,
  }
}

export const getTodos = () => {
  return async dispatch => {
    const res = await todosDB.get();
    dispatch(setTodos(res));
  }
}

const setTodos = (todos) => {
  return {
    type: 'SET_TODOS',
    payload: todos,
  }
}

export function createTodo(todo) {
  return async dispatch => {
    await todosDB.create(todo);
    dispatch({
      type: 'CREATE_TODO',
      payload: todo,
    })
  }
}

export function completeTodo(todo) {
  return {
    type: 'COMPLETE_TODO',
    payload: todo,
  };
}

export function removeTodo(todo) {
  return async dispatch => {
    await todosDB.remove(todo);
    dispatch({
      type: 'REMOVE_TODO',
      payload: todo,
    })
  }
}

export function showModal() {
  return {
    type: 'SHOW_MODAL',
  };
}

export function closeModal() {
  return {
    type: 'CLOSE_MODAL',
  };
}

export function showNav() {
  return {
    type: 'SHOW_NAV',
  };
}

export function closeNav() {
  return {
    type: 'CLOSE_NAV',
  };
}

export function authorizate(authState) {
  return {
    type: 'AUTH',
    payload: authState,
  }
}