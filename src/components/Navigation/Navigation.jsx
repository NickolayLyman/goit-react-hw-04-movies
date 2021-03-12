import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav>
      <NavLink exact to="/" className={s.home_link} activeClassName={s.active}>
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={s.movies_link}
        activeClassName={s.active}
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
