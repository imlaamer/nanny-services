import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

import Icon from '../common/Icon/Icon';
import Button from '../../uikit/Button/Button';
import Modal from '../common/Modal/Modal';
import ToggleButton from './ToggleButton/ToggleButton';
import LogoutCard from '../LogoutCard/LogoutCard';

import LoginForm from '../forms/LoginForm/LoginForm';
import SignupForm from '../forms/SignupForm/SignupForm';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';

import s from './BurgerMenu.module.css';

const variants = {
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 40,
      damping: 20,
    },
  },
  closed: {
    x: '100%',
    transition: {
      delay: 0.1,
      type: 'spring',
      stiffness: 450,
      damping: 40,
      duration: 0.1,
    },
  },
};

const BurgerMenu = ({
  isHomePage,
  handleCloseModal,
  handleOpenModal,
  isSignupModalOpen,
  isLogModalOpen,
  isLogoutModalOpen,
}) => {
  const [isOpen, setOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(`.${s.sidebar}`) &&
        !event.target.closest(`.${s.button}`)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleOpen = (e) => {
    setOpen(false);
    setTimeout(() => {
      handleOpenModal(e);
    }, 200);
  };

  return (
    <motion.div className={s.sidebar} animate={isOpen ? 'open' : 'closed'}>
      <motion.div
        className={isHomePage ? s.bg : s.notHomePageBg}
        variants={variants}
        animate={{ opacity: isOpen ? 1 : 0 }}
      >
        <nav className={s.container}>
          <div>
            <Button
              onClick={handleOpen}
              title={isLoggedIn ? 'Log out' : 'Log in'}
              className="navLogBtn"
              id={isLoggedIn ? 'logout' : 'log'}
            />
            {isLogModalOpen && (
              <Modal
                onClose={handleCloseModal}
                className="authModal"
                isOpen={isLogModalOpen}
              >
                <LoginForm handleCloseModal={handleCloseModal} />
              </Modal>
            )}
            {isLogoutModalOpen && (
              <Modal
                onClose={handleCloseModal}
                className="authModal"
                isOpen={isLogoutModalOpen}
              >
                <LogoutCard handleCloseModal={handleCloseModal} />
              </Modal>
            )}
            {!isLoggedIn && (
              <Button
                onClick={handleOpen}
                title="Sign up"
                className="navRegisterBtn"
                id="signup"
              />
            )}
            {isSignupModalOpen && (
              <Modal
                onClose={handleCloseModal}
                className="authModal"
                isOpen={isSignupModalOpen}
              >
                <SignupForm handleCloseModal={handleCloseModal} />
              </Modal>
            )}
          </div>

          <NavLink
            className={({ isActive }) =>
              `${s.navLink} ${isActive ? s.active : ''}`
            }
            to="/"
            onClick={() => {
              setOpen(false);
            }}
          >
            <Icon id="home" stroke="#103931" fill="#103931" />
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `${s.navLink} ${isActive ? s.active : ''}`
            }
            to="/nannies"
            onClick={() => {
              setOpen(false);
            }}
          >
            <Icon id="search" stroke="#103931" fill="#103931" />
            Nannies
          </NavLink>

          {isLoggedIn && (
            <NavLink
              className={({ isActive }) =>
                `${s.navLink} ${isActive ? s.active : ''}`
              }
              to="/favorites"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Icon id="heart" stroke="#103931" fill="#103931" />
              Favorites
            </NavLink>
          )}
        </nav>
      </motion.div>
      <ToggleButton
        setOpen={setOpen}
        isHomePage={isHomePage}
        handleCloseModal={handleCloseModal}
      />
    </motion.div>
  );
};

export default BurgerMenu;
