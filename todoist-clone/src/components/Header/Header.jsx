import React from 'react';

import logo from '../../assets/img/todoist-icon.png';
import styles from './Header.module.scss';

function Header(props) {
  const { showModal } = props;
  return (
    <header className={`Header ${styles.Header}`}>
      <img src={logo} alt='logo' />
      <h1>Todoist</h1>
      <button onClick={showModal}>+</button>
    </header>
  );
}

export default Header;
