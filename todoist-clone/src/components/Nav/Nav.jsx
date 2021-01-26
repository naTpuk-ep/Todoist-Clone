import React from 'react';
import { Link } from 'react-router-dom';

import './Nav.scss';

function Nav(props) {
  const { navClassName, closeNav } = props;

  return (
    <div className={navClassName}>
      <button className='close-btn' onClick={() => closeNav()}>
        &#65794;{' '}
      </button>
      <nav>
        <ul>
          <li>
            <Link to='/'>Main</Link>
          </li>
          <li>
            <Link to='/all'>All</Link>
          </li>
          <li>
            <Link to='/today'>Today</Link>
          </li>
          <li>
            <Link to='/upcoming'>Upcoming</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
