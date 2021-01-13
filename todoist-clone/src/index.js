import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './redux/reducers/rootReducer';

const store = createStore(
  rootReducer,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
