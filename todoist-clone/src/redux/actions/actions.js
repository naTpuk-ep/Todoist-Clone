export function createTodo(todo) {
  return {
    type: 'CREATE_TODO',
    payload: todo,
  };
}

export function completeTodo(todo) {
  return {
    type: 'COMPLETE_TODO',
    payload: todo,
  };
}

export function removeTodo(todo) {
  return {
    type: 'REMOVE_TODO',
    payload: todo,
  };
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