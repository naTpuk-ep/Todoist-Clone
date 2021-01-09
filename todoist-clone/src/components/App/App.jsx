import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import styles from './App.module.scss';

import Header from '../Header';
import Nav from '../Nav';
import Main from '../../pages/Main';
import Today from '../../pages/Today';
import Upcoming from '../../pages/Upcoming';

function App() {
  return (
    <BrowserRouter>
      <div className={`App ${styles.App}`}>
        <Header />
        <Nav />
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/today'>
            <Today />
          </Route>
          <Route path='/upcoming'>
            <Upcoming />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
