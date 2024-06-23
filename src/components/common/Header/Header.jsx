import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Container from '../Container/Container';
import Navigation from './Navigation/Navigation';
import BurgerMenu from '../../BurgerMenu/BurgerMenu';



import './Header.css';

const Header = () => {
  // const isLoading = useSelector(selectIsLoading);
  const location = useLocation();
  const isHomePage = location.pathname === '/'; //-> loggedInStatus auth

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
        console.log('Unexpected id'); //
        break;
    }

    // switch (false) {
    //   case isLogModalOpen:
    //     return setIsLogModalOpen(true);
    //   case isSignupModalOpen:
    //     return setIsSignupModalOpen(true);
    //   case isLogoutModalOpen:
    //     return setIsLogoutModalOpen(true);
    //   default:
    //     console.log('Unexpected false state ');
    //     break;
    // }
  };

  const handleCloseModal = () => {
    if (isLogModalOpen) {
      return setIsLogModalOpen(false);
    } else if (isSignupModalOpen) {
      return setIsSignupModalOpen(false);
    } else if (isLogoutModalOpen) {
      return setIsLogoutModalOpen(false);
    }
    // switch (true) {
    //   case isLogModalOpen:
    //     setIsLogModalOpen(false);
    //     break;
    //   case isSignupModalOpen:
    //     setIsSignupModalOpen(false);
    //     break;
    //   case isLogoutModalOpen:
    //     setIsLogoutModalOpen(false);
    //     break;
    //   default:
    //     console.log('Unexpected true state');
    //     break;
    // }
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
