import { useLocation } from 'react-router-dom';
import Container from '../Container/Container';
import Navigation from './Navigation/Navigation';

import './Header.css';
import BurgerMenu from '../../BurgerMenu/BurgerMenu';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/'; //-> loggedInStatus auth
  const headerClass = isHomePage ? 'transperentHeader' : 'coloredHeader';

  const isNanniesPage = location.pathname === '/nannies'; //-> loggedInStatus auth

  return (
    <header className={headerClass}>
      <Container>
        <Navigation isNanniesPage={isNanniesPage} isHomePage={isHomePage} />
        <BurgerMenu />
      </Container>
    </header>
  );
};

export default Header;
