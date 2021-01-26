import React from 'react';
import { Link } from 'react-router-dom';

import './Nav.scss';

function Nav() {
  return (
    <div className='Nav'>
      <nav>
        <ul>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
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
