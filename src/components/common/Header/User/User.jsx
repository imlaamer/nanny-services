import { useSelector } from 'react-redux';
import Icon from '../../Icon/Icon';
import s from './User.module.css';
import { selectUserName } from '../../../../redux/auth/authSelectors';

const User = () => {
  const username = useSelector(selectUserName);

  return (
    <div className={s.userWrapper}>
      <div className={s.userIconBox}>
        <Icon
          id="user"
          stroke="#103931"
          fill="#103931"
          width="24"
          height="24"
        />
      </div>
      <p className={s.userName}>{username}</p>
    </div>
  );
};

export default User;
