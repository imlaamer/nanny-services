import Icon from '../../../common/Icon/Icon';

import s from './Comment.module.css';

const Comment = ({ review }) => {
  const { comment, rating, reviewer } = review;
  const avatarFirstLetter = reviewer.split('')[0].toUpperCase();

  return (
    <li>
      <div className={s.avatarNameRatingBox}>
        <div className={s.avatar}>
          <span>{avatarFirstLetter}</span>
        </div>

        <div className={s.nameRatingBox}>
          <p>{reviewer}</p>
          <div className={s.iconRatingBox}>
            <Icon id="star" width="16" height="16" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
      <p className={s.commentText}>{comment}</p>
    </li>
  );
};
export default Comment;
