import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '../../../../uikit/Button/Button';
import Modal from '../../Modal/Modal';
import User from '../User/User';

import logo from '../../../../assets/static/icons/baby.svg';
import LogoutCard from '../../../LogoutCard/LogoutCard';
import LoginForm from '../../../forms/LoginForm/LoginForm';
import SignupForm from '../../../forms/SignupForm/SignupForm';
import { selectIsLoggedIn } from '../../../../redux/auth/authSelectors';

import s from './Navigation.module.css';

const Navigation = ({
  isHomePage,
  handleOpenModal,
  handleCloseModal,
  isLogModalOpen,
  isSignupModalOpen,
  isLogoutModalOpen,
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={s.logoNavWrapper}>
      {!isLoggedIn && (
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

          {isLoggedIn && (
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
          {isLoggedIn && <User />}

          <div className={s.btnsBox}>
            <Button
              title={isLoggedIn ? 'Log out' : 'Log in'}
              onClick={handleOpenModal}
              className={isHomePage ? 'logBtn' : 'coloredBgBtn'}
              id={isLoggedIn ? 'logout' : 'log'}
            />

            {isLogModalOpen && (
              <Modal
                onClose={handleCloseModal}
                className="authModal"
                isOpen={isLogModalOpen} //
                title="Log in"
              >
                <LoginForm handleCloseModal={handleCloseModal} />
              </Modal>
            )}

            {isLogoutModalOpen && (
              <Modal
                onClose={handleCloseModal}
                className="authModal"
                isOpen={isLogoutModalOpen} //
              >
                <LogoutCard handleCloseModal={handleCloseModal} />
              </Modal>
            )}

            {!isLoggedIn && (
              <Button
                title="Sign up"
                onClick={handleOpenModal}
                className={isHomePage ? 'registerBtn' : 'whiteRegisterBtn'}
                id="signup"
              />
            )}
            {isSignupModalOpen && (
              <Modal onClose={handleCloseModal} className="authModal">
                <SignupForm
                  handleCloseModal={handleCloseModal}
                  isOpen={isSignupModalOpen}
                />
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
