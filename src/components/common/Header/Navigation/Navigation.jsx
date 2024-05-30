import { NavLink } from 'react-router-dom';

import s from './Navigation.module.css';
import Button from '../../../../uikit/Button/Button';
import { useState } from 'react';
import Modal from '../../Modal/Modal';

const Navigation = ({ isNanniesPage, isHomePage }) => {
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleOpenModal = (e) => {
    if (e.target.id === 'log') {
      setIsLogModalOpen(true);
    } else {
      setIsSignupModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    if (isLogModalOpen) {
      setIsLogModalOpen(false);
    }
    if (isSignupModalOpen) {
      setIsSignupModalOpen(false);
    }
  };

  //temporary: isNanniesPage isHomePage -> loggedInStatus auth

  return (
    <div className={s.logoNavWrapper}>
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
