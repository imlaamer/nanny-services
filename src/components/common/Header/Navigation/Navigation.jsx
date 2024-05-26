import { NavLink } from 'react-router-dom';

import s from './Navigation.module.css';

const Navigation = () => {
  return (
    <div className={s.navLogoWrapper}>
      <div className={s.navWrapper}>
        <NavLink
          className={({ isActive }) =>
            `${s.navLink} ${isActive ? s.active : ''}`
          }
          to="/"
        >
          Home
        </NavLink>
      </div>

      <NavLink className={s.logoText} to="/">
        Logo
      </NavLink>
    </div>
  );
};

export default Navigation;
