import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import Button from '../../../../uikit/Button/Button';
import Modal from '../../Modal/Modal';
import User from '../User/User';

import logo from '../../../../assets/static/icons/baby.svg';
import s from './Navigation.module.css';

const Navigation = ({
  isHomePage,
  handleOpenModal,
  handleCloseModal,
  isLogModalOpen,
  isSignupModalOpen,
}) => {
  // const loggedInStatus = true;
  const loggedInStatus = false;

  return (
    <div className={s.logoNavWrapper}>
      {/* {loggedInStatus && <User />} */}

      {!loggedInStatus && (
        <NavLink to="/" className={s.logo}>
          <img src={logo} alt="logo" />
        </NavLink>
      )}

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

          {loggedInStatus && (
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

        <div className={s.userBtnWrapper}>
          {loggedInStatus && <User />}

          <div className={s.btnsBox}>
            <Button
              title={loggedInStatus ? 'Log out' : 'Log in'}
              onClick={handleOpenModal}
              className={isHomePage ? 'logBtn' : 'coloredBgBtn'}
              id="log"
            />
            {isLogModalOpen && <Modal onClose={handleCloseModal}></Modal>}

            {!loggedInStatus && (
              <Button
                title="Sign up"
                // title="Registration"
                onClick={handleOpenModal}
                className={isHomePage ? 'registerBtn' : 'whiteRegisterBtn'}
                id="signup"
              />
            )}
            {isSignupModalOpen && <Modal onClose={handleCloseModal}></Modal>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
