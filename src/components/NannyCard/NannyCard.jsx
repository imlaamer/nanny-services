import { useRef, useState } from 'react';
import Icon from '../common/Icon/Icon';
// import MoreDetails from './MoreDetails/MoreDetails';
import { MoreDetails } from '../NannyCard/MoreDetails/MoreDetails';

import s from './NannyCard.module.css';
import { scrollDownOnLoadMore } from '../../helpers/scrollDownOnLoadMore';
import Button from '../../uikit/Button/Button';

const NannyCard = () => {
  const [isOpenReadMore, setIsOpenReadMore] = useState(false);
  const listRef = useRef(null);

  //   const detailsBlocks = {
  //     age: 27,
  //     experience: '5 years',
  //     kids_age: '1 to 6 years old',
  //     characters: ['patient', 'energetic', 'creative', 'punctual'],
  //     education: 'Bachelor’s in Early Childhood Education, First Aid Certified',
  //   };

  const detailsBlocks = {
    Age: 27,
    Experience: '5 years',
    'Kids Age': '1 to 6 years old',
    Characters: ['patient', 'energetic', 'reative', 'punctual'],
    Education: 'Bachelor’s in Early Childhood Education, First Aid Certified',
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
            <img
              src="https://ftp.goit.study/img/avatars/10.jpg"
              alt="nanny`s avatar"
            />
            <div className={s.statusBox}></div>
          </div>
        </div>

        <Icon id="heart" width="26" height="26" className="favIcon" />
        {/* 
      <div>
        <p className={s.accent}>Nanny</p>
        <h2 className={s.nameTitle}>Anna Shevchenko</h2>
      </div> */}

        <div className={s.infoWrapper}>
          <div className={s.namePositionedWrapper}>
            <div className={s.mainInfoWrapper}>
              <div>
                <p className={s.accent}>Nanny</p>
                <h2 className={s.nameTitle}>Anna Shevchenko</h2>
              </div>
              {/* <h2 className={`${s.nameTitle} ${s.hiddenToTabl}`}></h2> */}

              <div className={s.iconsTextFavWrapper}>
                <div className={s.iconsTextBox}>
                  <div className={s.iconTextWrapper}>
                    <Icon id="map-pin" width="16" height="16" />
                    <p>Kyiv, Ukraine</p>
                  </div>

                  <div className={s.iconTextWrapper}>
                    <Icon id="star" width="16" height="16" />
                    <p>Rating: 4.5</p>
                  </div>

                  <p>
                    Price / 1 hour: <span className={s.priceAccent}>15$</span>
                  </p>
                </div>

                {/* <Icon id="heart" width="26" height="26" className='favIcon' /> */}
              </div>
            </div>
            {/* <h2 className={`${s.nameTitle} ${s.hiddenToDeskt}`}>
            Anna Shevchenko
          </h2> */}
          </div>

          <div className={s.detailsWrapper}>
            {keys.map((key, index) => {
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

          <p className={s.aboutText}>
            I love children and have been working with them for over 5 years. I
            believe in creating a positive and nurturing environment for kids. I
            also love outdoor activities and crafts.
          </p>

          <p className={s.readMoreText} onClick={handleReadMore}>
            {!isOpenReadMore ? 'Read more' : 'Hide'}
          </p>

          {/* {!isOpenReadMore && (
          <p className={s.readMoreText} onClick={() => setIsOpenReadMore(!isOpenReadMore)}>
            Read more
          </p>
        )} */}

          {isOpenReadMore && <MoreDetails ref={listRef} />}
        </div>
      </div>
      <Button
        className="loadMoreBtn"
        title="Load more"
        // onClick={handleOpen}
      />
    </>
  );
};

export default NannyCard;
