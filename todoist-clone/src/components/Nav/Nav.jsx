import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../../persistance/network';
import { authorizate } from '../../redux/actions/actions';

import './Nav.scss';

function Nav(props) {
  const { navClassName, closeNav, authorizate } = props;

  const logoutHandler = () => {
    auth.setToken(undefined);
    authorizate(false);
  };

  return (
    <div className={navClassName}>
      <button className='close-btn' onClick={closeNav}>
        &#65794;{' '}
      </button>
      <nav>
        <ul>
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
          <li>
            <Link to='/'>Main</Link>
          </li>
          {/* <li>
            <Link to='/all'>All</Link>
          </li> */}
          <li>
            <Link to='/today'>Today</Link>
          </li>
          <li>
            <Link to='/week'>Week</Link>
          </li>
          <li>
            <Link to='/month'>Month</Link>
          </li>
          {/* <li>
            <Link to='/upcoming'>Upcoming</Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}

const mapDispatchToProps = {
  authorizate,
};

export default connect(null, mapDispatchToProps)(Nav);
