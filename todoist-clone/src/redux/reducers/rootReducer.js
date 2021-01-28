import { combineReducers } from 'redux';
import todosReducer from './todosReducer';
import domElementsReducer from './domElementsReducer';
import authReducer from './authReducer';

export const rootReducer = combineReducers({
  todos: todosReducer,
  domElementsClassNames: domElementsReducer,
  authState: authReducer,
});
