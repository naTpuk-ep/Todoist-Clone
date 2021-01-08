import './BurgerMenu.scss';
// import { setState } from 'react';

function BurgerMenu({path}) {

  return (
    <div className='burger-menu'>
      <nav>
				<a href={path.today}>Today</a>
				<a href={path.upcoming}>Upcoming</a>
			</nav>
    </div>
  );
}

export default BurgerMenu;
