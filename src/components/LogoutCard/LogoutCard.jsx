import { useDispatch } from 'react-redux';
import Button from '../../uikit/Button/Button';
import Container from '../common/Container/Container';
import { signOut } from '../../redux/auth/authSlice';
import s from './LogoutCard.module.css';

const LogoutCard = ({ handleCloseModal }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOut());
    handleCloseModal();
  };

  return (
    <Container className="auth-container">
      <h2 className={s.title}>Log out</h2>
      <p className={s.text}>Do you really want to leave?</p>
      <Button
        type="submit"
        className="logoutBtn"
        title="Log out"
        onClick={handleLogout}
      />
      <Button
        className="logoutCancelBtn"
        title="Cancel"
        onClick={handleCloseModal}
      />
    </Container>
  );
};

export default LogoutCard;
