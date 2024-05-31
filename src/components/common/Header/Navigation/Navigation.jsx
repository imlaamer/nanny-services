import { NavLink } from 'react-router-dom';

import s from './Navigation.module.css';
import Button from '../../../../uikit/Button/Button';
import { useState } from 'react';
import Modal from '../../Modal/Modal';

import logo from '../../../../assets/static/icons/baby.svg';

const Navigation = ({
  isNanniesPage,
  isHomePage,
  handleOpenModal,
  handleCloseModal,
  isLogModalOpen,
  isSignupModalOpen,
}) => {
  //temporary: isNanniesPage isHomePage -> loggedInStatus auth

  return (
    <div className={s.logoNavWrapper}>
      <NavLink to="/" className={s.logo}>
        <img src={logo} alt="logo" />
      </NavLink>

      <NavLink className={` ${s.logoText} `} to="/">
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
            className="logBtn"
            id="log"
          />
          {isLogModalOpen && <Modal onClose={handleCloseModal}></Modal>}

          {isHomePage && (
            <Button
              title="Sign up"
              // title="Registration"
              onClick={handleOpenModal}
              className="registerBtn"
              id="signup"
            />
          )}
          {isSignupModalOpen && <Modal onClose={handleCloseModal}></Modal>}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
