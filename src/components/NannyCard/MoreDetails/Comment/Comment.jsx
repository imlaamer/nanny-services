import Icon from '../../../common/Icon/Icon';

import s from './Comment.module.css';

const Comment = () => {
  //  const defaultAvatarFirstLetter = user.email.split('')[0].toUpperCase();

  return (
    <>
      <div className={s.avatarNameRatingBox}>
        <div className={s.avatar}>
          <span>J</span>
          {/* {user.avatarURL && !isLoading && (
          <img src={user.avatarURL} alt="avatar" />
        )}
        {!user.avatarURL && !isLoading && <p>{defaultAvatarFirstLetter}</p>}
        {isLoading && <Spinner />} */}
        </div>

        <div className={s.nameRatingBox}>
          <p>Olga K.</p>
          <div className={s.iconRatingBox}>
            <Icon id="star" width="16" height="16" />
            <span>5.0</span>
          </div>
        </div>
      </div>
      <p className={s.commentText}>
        Anna is wonderful! My kids loved her and she was always punctual.
      </p>
    </>
  );
};
export default Comment;
