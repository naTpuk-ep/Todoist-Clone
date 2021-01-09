import logo from '../../assets/img/todoist-icon.png';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={`Header ${styles.Header}`}>
      <img src={logo} alt='logo' />
      <h1>Todoist</h1>
      <button>+</button>
    </header>
  );
}

export default Header;
