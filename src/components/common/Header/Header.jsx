import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Container from '../Container/Container';
import Navigation from './Navigation/Navigation';
import BurgerMenu from '../../BurgerMenu/BurgerMenu';

import './Header.css';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const headerClass = isHomePage ? 'transperentHeader' : 'coloredHeader';

  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleOpenModal = (e) => {
    switch (e.target.id) {
      case 'log':
        setIsLogModalOpen(true);
        break;
      case 'signup':
        setIsSignupModalOpen(true);
        break;
      case 'logout':
        setIsLogoutModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleCloseModal = () => {
    if (isLogModalOpen) {
      return setIsLogModalOpen(false);
    } else if (isSignupModalOpen) {
      return setIsSignupModalOpen(false);
    } else if (isLogoutModalOpen) {
      return setIsLogoutModalOpen(false);
    }
  };

  return (
    <header className={headerClass}>
      <Container className="header-container">
        <Navigation
          isHomePage={isHomePage}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
          isLogModalOpen={isLogModalOpen}
          isSignupModalOpen={isSignupModalOpen}
          isLogoutModalOpen={isLogoutModalOpen}
        />
        <BurgerMenu
          isHomePage={isHomePage}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
          isLogModalOpen={isLogModalOpen}
          isSignupModalOpen={isSignupModalOpen}
          isLogoutModalOpen={isLogoutModalOpen}
        />
      </Container>
    </header>
  );
};

export default Header;
