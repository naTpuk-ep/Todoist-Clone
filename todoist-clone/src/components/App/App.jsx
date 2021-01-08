import './App.scss';
import Header from '../Header';
import BurgerMenu from '../BurgerMenu';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Today from '../../pages/Today';
import Upcoming from '../../pages/Upcoming';

function App() {
  const [ path ] = useState({
		today: '/today',
		upcoming: '/upcoming'
	});

  return (
    <div className='App'>
      <Header />
      <main>
        <div className = "routes">
          <Switch>
            <Route path = {path.today} exact component={Today} />
            <Route path = {path.upcoming} exact component={Upcoming} />
          </Switch>
				</div>
      </main>
      <BurgerMenu path = {path}/>
    </div>
  );
}

export default App;
