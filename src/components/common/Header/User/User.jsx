import Icon from '../../Icon/Icon';
import s from './User.module.css';

const User = () => {
  //{ userName }

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
      <p className={s.userName}>Lolita</p>
    </div>
  );
};

export default User;
