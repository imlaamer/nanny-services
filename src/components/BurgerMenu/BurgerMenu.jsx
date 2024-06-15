import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLockBodyScroll } from 'react-use';
import Icon from '../common/Icon/Icon';
import Button from '../../uikit/Button/Button';
import Modal from '../common/Modal/Modal';
import ToggleButton from './ToggleButton/ToggleButton';
import LoginForm from '../forms/LoginForm/LoginForm';
// import NavItem from '../Navigation/NavItem/NavItem';
// import { navConfig } from '../../data/navigation';
import SignupForm from '../forms/SignupForm/SignupForm';
import LogoutCard from '../LogoutCard/LogoutCard';

import { auth } from '../../firebase';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
import s from './BurgerMenu.module.css';

const variants = {
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 40,
      damping: 20,
      // duration: 0.0005,
      // duration: 0.1,
    },
  },
  closed: {
    x: '100%',

    transition: {
      delay: 0.1,

      // delay: 0.05,
      type: 'spring',
      stiffness: 450,
      damping: 40,
      duration: 0.1, //не змінюється
      // duration: 0.05,
      // duration: 0.0005,
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
  // const [isToggleStroke, setIsToggleStroke] = useState(false);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const loggedInStatus = auth.currentUser; //temporary !

  // useLockBodyScroll(true); //- теж блокує  скрол

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

  //  ???
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
              title={isLoggedIn ? 'Log out' : 'Log in'}
              className="navLogBtn"
              id={isLoggedIn ? 'logout' : 'log'}
            />

            {/* {!loggedInStatus && (
              <Button
                onClick={handleOpen}
                title="Log in"
                className="navLogBtn"
                id="log"
              />
            )}

            {loggedInStatus && (
              <Button
                onClick={handleOpen}
                title="Log out"
                className="navLogBtn"
                id="logout"
              />
            )} */}

            {/* !loggedInStatus */}
            {isLogModalOpen && (
              <Modal
                onClose={handleCloseModal}
                className="authModal"
                // isOpen={isLogModalOpen} //scroll test
              >
                <LoginForm handleCloseModal={handleCloseModal} />
              </Modal>
            )}
            {/* && loggedInStatus */}
            {isLogoutModalOpen && (
              <Modal
                onClose={handleCloseModal}
                className="authModal"
                // isOpen={isLogModalOpen} //scroll test?
              >
                <LogoutCard handleCloseModal={handleCloseModal} />
              </Modal>
            )}
            {!isLoggedIn && (
              <Button
                onClick={handleOpen}
                title="Sign up"
                // title="Registration"
                className="navRegisterBtn"
                id="signup"
              />
            )}
            {isSignupModalOpen && (
              <Modal
                onClose={handleCloseModal}
                className="authModal"
                // isOpen={isSignupModalOpen}
              >
                <SignupForm handleCloseModal={handleCloseModal} />
              </Modal>
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
