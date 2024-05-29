import { NavLink } from 'react-router-dom';

import s from './Navigation.module.css';
import Button from '../../../../uikit/Button/Button';
import { useState } from 'react';

const Navigation = ({ isNanniesPage, isHomePage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  //temporary: isNanniesPage isHomePage -> loggedInStatus auth

  return (
    <div className={s.logoNavWrapper}>
      <NavLink className={`${s.navLink} ${s.logoText} `} to="/">
        Nanny.Services
      </NavLink>

      <div className={s.navWrapper}>
        <div className={s.linkBox}>
          <NavLink
            className={({ isActive }) =>
              `${s.navLink} ${isActive ? s.active : ''}`
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `${s.navLink} ${isActive ? s.active : ''}`
            }
            to="/nannies"
          >
            Nannies
          </NavLink>

          {!isHomePage && (
            <NavLink
              className={({ isActive }) =>
                `${s.navLink} ${isActive ? s.active : ''}`
              }
              to="/favorites"
            >
              Favorites
            </NavLink>
          )}
        </div>

        <div className={s.btnsBox}>
          <Button
            title={isNanniesPage ? 'Log out' : 'Log in'}
            onClick={handleOpenModal}
            className="loginBtn"
          />

          {isHomePage && (
            <Button
              title="Registration"
              onClick={handleOpenModal}
              className="registerBtn"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
