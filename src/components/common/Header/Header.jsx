import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Container from '../Container/Container';
import Navigation from './Navigation/Navigation';
import BurgerMenu from '../../BurgerMenu/BurgerMenu';

// import { selectIsLoading } from '../../../redux/items/itemsSelectors';

import './Header.css';

const Header = () => {
  // const isLoading = useSelector(selectIsLoading);
  const location = useLocation();
  const isHomePage = location.pathname === '/'; //-> loggedInStatus auth
  const headerClass = isHomePage ? 'transperentHeader' : 'coloredHeader';

  const isNanniesPage = location.pathname === '/nannies'; //-> loggedInStatus auth

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

  return (
    <header className={headerClass}>
      <Container className="header-container">
        <Navigation
          isNanniesPage={isNanniesPage}
          isHomePage={isHomePage}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
          isLogModalOpen={isLogModalOpen}
          isSignupModalOpen={isSignupModalOpen}
        />
        <BurgerMenu
          isHomePage={isHomePage}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
          isLogModalOpen={isLogModalOpen}
          isSignupModalOpen={isSignupModalOpen}
        />
      </Container>
    </header>
  );
};

export default Header;
