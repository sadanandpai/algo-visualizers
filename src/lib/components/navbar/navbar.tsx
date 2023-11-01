import { Link, NavLink } from 'react-router-dom';

import { NavbarProps } from '@/apps/sorting-visualizer/models/interfaces';
import classes from './navbar.module.scss';
import hamIcon from '/icons/ham.svg';
import { useState } from 'react';

function Navbar({ title, menuItems }: NavbarProps) {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className={classes.navbar}>
      <h1 data-testid="navbar">
        <Link to="/" className={classes.home}>
          <img src="/icons/home.svg" alt="home" />
        </Link>
        {title}
        <a
          href="https://github.com/sadanandpai/sorting-visualizer"
          target="blank"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="github repo"
            className={classes.github}
          />
        </a>
      </h1>

      {menuItems ? (
        <>
          <button onClick={() => setToggle(!toggle)}>
            <img src={hamIcon} alt="hamburger" />
          </button>
          <ul data-toggle={toggle}>
            {menuItems.map((item) => (
              <li key={item}>
                <NavLink
                  to={`/sorting-visualizer/${item}`}
                  className={({ isActive }) => (isActive ? classes.active : '')}
                  onClick={() => setToggle(false)}
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </nav>
  );
}

export default Navbar;
