import { NavLink } from 'react-router-dom';
import css from './header.module.css';
export const Header = () => {
  let activeClassName = {
    color: '#90cea1',
    fontWeight: 700,
  };

  return (
    <header className={css.header}>
      <nav className={css.navs}>
        <ul className={css.list}>
          <li>
            <NavLink
              to="/home"
              className={css.links}
              style={({ isActive }) => (isActive ? activeClassName : undefined)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search"
              className={css.links}
              style={({ isActive }) => (isActive ? activeClassName : undefined)}
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
