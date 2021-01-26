import { combineReducers } from 'redux';
import todosReducer from './todosReducer';
import domElementsReducer from './domElementsReducer';

export const rootReducer = combineReducers({
  todos: todosReducer,
  domElementsClassNames: domElementsReducer,
});
