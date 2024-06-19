import Button from '../../uikit/Button/Button';
import Container from '../common/Container/Container';

import s from './FavoritesAccessCard.module.css';

const FavoritesAccessCard = ({ onClose }) => {
  return (
    <Container className="auth-container">
      <h2 className={s.title}> Please log in or sign up</h2>
      <p className={s.text}>
        Only registered and logged users have access to Favorites.
      </p>
      <Button className="logoutBtn" title="OK" onClick={onClose} />
    </Container>
  );
};

export default FavoritesAccessCard;
