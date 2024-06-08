import { useRef, useState } from 'react';
import Icon from '../common/Icon/Icon';
// import MoreDetails from './MoreDetails/MoreDetails';
import { MoreDetails } from '../NannyCard/MoreDetails/MoreDetails';
import Button from '../../uikit/Button/Button';
import { scrollDownOnLoadMore } from '../../helpers/scrollDownOnLoadMore';
import { calculateAge } from '../../helpers/formatData';
import s from './NannyCard.module.css';

const NannyCard = ({ nanny }) => {
  const [isOpenReadMore, setIsOpenReadMore] = useState(false);
  const listRef = useRef(null);

  const {
    about,
    avatar_url,
    birthday,
    characters,
    education,
    experience,
    kids_age,
    location,
    name,
    price_per_hour,
    rating,
    reviews,
  } = nanny;

  const age = calculateAge(birthday);

  const detailsBlocks = {
    Age: age,
    Experience: experience,
    'Kids Age': kids_age,
    Characters: characters,
    Education: education,
  };

  const keys = Object.keys(detailsBlocks);

  const handleReadMore = () => {
    setIsOpenReadMore(!isOpenReadMore);

    // const setScrollDown = (ref) => {
    //   setTimeout(() => {
    //     if (!ref.current) return;
    //     scrollDownOnLoadMore(ref);
    //   }, 500);
    // };
    // setScrollDown(listRef);
  };

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.avatarWrapper}>
          <div className={s.avatarUserStatusBox}>
            <img src={avatar_url} alt="nanny's avatar" />

            {/* {user.avatarURL && !isLoading && (
          <img src={user.avatarURL} alt="avatar" />
        )}
        {!user.avatarURL && !isLoading && <p>{defaultAvatarFirstLetter}</p>}
        {isLoading && <Spinner />} */}

            <div className={s.statusBox}></div>
          </div>
        </div>

        <Icon id="heart" width="26" height="26" className="favIcon" />

        <div className={s.infoWrapper}>
          <div className={s.namePositionedWrapper}>
            <div className={s.mainInfoWrapper}>
              <div>
                <p className={s.accent}>Nanny</p>
                <h2 className={s.nameTitle}>{name}</h2>
              </div>

              <div className={s.iconsTextFavWrapper}>
                <div className={s.iconsTextBox}>
                  <div className={s.iconTextWrapper}>
                    <Icon id="map-pin" width="16" height="16" />
                    <p>{location}</p>
                  </div>

                  <div className={s.iconTextWrapper}>
                    <Icon id="star" width="16" height="16" />
                    <p>Rating: {rating}</p>
                  </div>

                  <p>
                    Price / 1 hour:{' '}
                    <span className={s.priceAccent}>{price_per_hour}$</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={s.detailsWrapper}>
            {keys.map((key, index) => {
              // винести в хелпери?
              let value = detailsBlocks[key];
              if (key === 'Characters') {
                const formattedArr = detailsBlocks[key]
                  .map((word) => word.charAt(0).toUpperCase() + word?.slice(1))
                  .join(', ');
                value = formattedArr;
              }

              return (
                <div className={s.detailBox} key={index}>
                  <p className={key === 'Age' ? s.accentBorderText : ''}>
                    <span className={s.accent}>{key}: </span> {value}
                  </p>
                </div>
              );
            })}
          </div>

          <p className={s.aboutText}>{about}</p>

          <p className={s.readMoreText} onClick={handleReadMore}>
            {!isOpenReadMore ? 'Read more' : 'Hide'}
          </p>

          {isOpenReadMore && (
            <MoreDetails
              ref={listRef}
              reviews={reviews}
              name={name}
              avatar={avatar_url}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default NannyCard;
