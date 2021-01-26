import React from 'react';

import logo from '../../assets/img/todoist-icon.png';
import './Header.scss';

function Header(props) {
  const { showModal, showNav } = props;

  return (
    <header className='Header'>
      <img src={logo} onClick={() => showNav()} alt='logo' />
      <h1>Todoist</h1>
      <button onClick={() => showModal()}>+</button>
    </header>
  );
}

export default Header;
