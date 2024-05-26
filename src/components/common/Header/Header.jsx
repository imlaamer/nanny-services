import Container from '../Container/Container';
import Navigation from './Navigation/Navigation';
import './Header.css';

const Header = () => {
  return (
    <header>
      <Container className="header-container">
        <Navigation />
      </Container>
    </header>
  );
};

export default Header;
