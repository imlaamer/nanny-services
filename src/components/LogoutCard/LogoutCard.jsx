import { useDispatch } from 'react-redux';

import Button from '../../uikit/Button/Button';
import Container from '../common/Container/Container';

import s from './LogoutCard.module.css';
// import { logoutUser } from '../../redux/auth/authOperations';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { resetUser } from '../../redux/auth/authSlice';

const LogoutCard = ({ handleCloseModal }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    const auth = getAuth();
    if (!auth.currentUser) {
      return toast.error('Not authorized');
    }
    signOut(auth)
      .then(() => {
        dispatch(resetUser());
      })
      .then(() => {
        toast.success('Log out success!');
        handleCloseModal();
      })
      .catch((error) => toast.error(error?.message));
    // dispatch(logoutUser())
    //   .unwrap()
    //   .then(() => {
    //     handleCloseModal();
    //     // onClose(); закрити модалку + redirect
    //   })
    //   .catch((error) => console.error(error?.message));
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
