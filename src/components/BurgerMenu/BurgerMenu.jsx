import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLockBodyScroll } from 'react-use';
import Icon from '../common/Icon/Icon';
import Button from '../../uikit/Button/Button';
import Modal from '../common/Modal/Modal';
import ToggleButton from './ToggleButton/ToggleButton';
// import NavItem from '../Navigation/NavItem/NavItem';
// import { navConfig } from '../../data/navigation';
import s from './BurgerMenu.module.css';

const variants = {
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 40,
      damping: 20,
      duration: 0.2,
    },
  },
  closed: {
    x: '100%',

    transition: {
      delay: 0.2,
      type: 'spring',
      stiffness: 450,
      damping: 40,
      duration: 0.2,
    },
  },
};

const BurgerMenu = ({
  isHomePage,
  handleCloseModal,
  handleOpenModal,
  isSignupModalOpen,
  isLogModalOpen,
}) => {
  const [isOpen, setOpen] = useState(false);
  // const [isToggleStroke, setIsToggleStroke] = useState(false);

  const loggedInStatus = false;
  // const loggedInStatus = true;

  // useLockBodyScroll(true); - теж блокує любий скрол

  // але тоді на моб модалка та меню не будуть скролитись
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(`.${s.sidebar}`) &&
        !event.target.closest(`.${s.button}`)
      ) {
        setOpen(false);
        // setIsToggleStroke(false);
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
    <motion.div
      className={s.sidebar}
      animate={isOpen ? 'open' : 'closed'}
      // animate={{ opacity: isOpen ? 1 : 0 }}
    >
      <motion.div
        className={isHomePage ? s.bg : s.notHomePageBg}
        variants={variants}
        animate={{ opacity: isOpen ? 1 : 0 }}
      >
        <nav className={s.container}>
          {/* <div> */}
          <div>
            <Button
              onClick={handleOpen}
              title={loggedInStatus ? 'Log out' : 'Log in'}
              className="navLogBtn"
              id="log"
            />
            {isLogModalOpen && (
              <Modal onClose={handleCloseModal}>
                <p>Log in</p>
              </Modal>
            )}

            {!loggedInStatus && (
              <Button
                onClick={handleOpen}
                title="Sign up"
                // title="Registration"
                className="navRegisterBtn"
                id="signup"
              />
            )}

            {isSignupModalOpen && (
              <Modal onClose={handleCloseModal}>Sign up</Modal>
            )}
          </div>
          {/* <nav className={s.container}> */}
          {/* {navConfig.map(({ id, name, path }) => (
            <NavItem key={id} name={name} to={path} />
          ))} */}

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

          {loggedInStatus && (
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
        {/* </div> */}
      </motion.div>
      <ToggleButton
        setOpen={setOpen}
        // isToggleStroke={isToggleStroke}
        // setIsToggleStroke={setIsToggleStroke}
        isHomePage={isHomePage}
        handleCloseModal={handleCloseModal}
      />
    </motion.div>
  );
};

export default BurgerMenu;
