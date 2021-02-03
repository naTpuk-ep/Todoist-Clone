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
        <i className='material-icons'>clear</i>
      </button>
      <nav>
        <ul>
          <li>
            <button className='logout-btn' onClick={logoutHandler}>
              Logout
            </button>
          </li>
          <li onClick={closeNav}>
            <Link to='/Todoist-Clone'>Main</Link>
          </li>
          <li onClick={closeNav}>
            <Link to='/Todoist-Clone/today'>Today</Link>
          </li>
          <li onClick={closeNav}>
            <Link to='/Todoist-Clone/week'>Week</Link>
          </li>
          <li onClick={closeNav}>
            <Link to='/Todoist-Clone/month'>Month</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

const mapDispatchToProps = {
  authorizate,
};

export default connect(null, mapDispatchToProps)(Nav);
