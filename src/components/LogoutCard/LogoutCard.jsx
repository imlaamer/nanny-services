import Button from '../../uikit/Button/Button';
import Container from '../common/Container/Container';

import s from './LogoutCard.module.css';

const LogoutCard = () => {
  return (
    <Container className="auth-container">
      <h2 className={s.title}>Log out</h2>
      <p className={s.text}>Do you really want to leave?</p>
      <Button type="submit" className="logoutBtn" title="Log out" />
      <Button className="logoutCancelBtn" title="Cancel" />
    </Container>
  );
};

export default LogoutCard;

// "logoutCardTitle": "Log out",
//     "logoutCardDescription": "Do you really want to leave?",
//     "cancelButton": "Cancel",
//     "deleteButton": "Delete",
//     "logoutButton": "Log out"
