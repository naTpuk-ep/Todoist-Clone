import { CREATE_TODO, COMPLETE_TODO } from './types';

export function createTodo(todo) {
  return {
    type: CREATE_TODO,
    payload: todo,
  };
}

export function completeTodo(todo) {
  return {
    type: COMPLETE_TODO,
    payload: todo,
  };
}
