import './Nav.scss';
import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className='Nav'>
      <nav>
        <ul>
          <li>
            <Link to='/'>Main</Link>
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
