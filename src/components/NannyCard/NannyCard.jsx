import { useDispatch, useSelector } from 'react-redux';
import { onValue, ref, remove, update } from 'firebase/database';
import { useEffect, useRef, useState } from 'react';

import Icon from '../common/Icon/Icon';
import FavoritesAccessCard from '../FavoritesAccessCard/FavoritesAccessCard';
import Modal from '../common/Modal/Modal';
import { MoreDetails } from '../NannyCard/MoreDetails/MoreDetails';

import { calculateAge } from '../../helpers/formatData';
import {
  selectFavorites,
  selectIsLoggedIn,
  selectUserId,
} from '../../redux/auth/authSelectors';
import { db } from '../../firebase';
// import { removeFromFavorites } from '../../redux/auth/authSlice';

import s from './NannyCard.module.css';
import { removeNannieFromFavs } from '../../redux/nannies/nanniesSlice';
import { toast } from 'react-toastify';

const NannyCard = ({ nanny, favorites }) => {
  const dispatch = useDispatch();
  const [isOpenReadMore, setIsOpenReadMore] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [isFavsAccessModalOpen, setIsFavsAccessModalOpen] = useState(false);

  const listRef = useRef(null);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const uid = useSelector(selectUserId);

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

  //--------set red heart if in db favs
  useEffect(() => {
    if (!uid) {
      return setIsFav(false);
    }
    //|| favorites.length === 0 не працює , слухач все одно відпрацьовує

    const favsRef = ref(db, 'users/' + uid + '/favorites');
    const unsubscribe = onValue(favsRef, (snapshot) => {
      // if (snapshot.exists()) return;
      const favs = snapshot.val();
      if (!favs) return;

      Object.values(favs)?.forEach((fav) => {
        if (fav.id === nanny.id) {
          setIsFav(true);
          return;
        }
      });
    });

    return () => unsubscribe(); // return  unsubscribe ?
  }, [uid, nanny.id]);

  const handleCloseModal = () => {
    setIsFavsAccessModalOpen(false);
  };

  const handleFavClick = () => {
    if (!isLoggedIn) {
      setIsFavsAccessModalOpen(true);
      return;
    }
    //---------remove from favs
    if (isFav) {
      const nannyRef = ref(db, 'users/' + uid + '/favorites/' + nanny.id);
      remove(nannyRef)
        .then(() => {
          setIsFav(false);
          dispatch(removeNannieFromFavs(nanny.id));
        })
        .catch((error) => toast.error(error?.message));
      return;
    }
    //----------add to favs
    const updates = {};
    updates['/users/' + uid + '/favorites/' + nanny.id] = nanny;
    update(ref(db), updates)
      .then(() => {
        setIsFav(true);
      })
      .catch((error) => toast.error(error?.message));
  };

  return (
    <li className={s.wrapper}>
      <div className={s.avatarWrapper}>
        <div className={s.avatarUserStatusBox}>
          <img src={avatar_url} alt="nanny's avatar" />

          <div className={s.statusBox}></div>
        </div>
      </div>
      <button className={s.favBtn} type="button" onClick={handleFavClick}>
        <Icon
          id={!isFav ? 'heart' : 'heart-red'}
          width="26"
          height="26"
          className="favIcon"
        />
      </button>

      {isFavsAccessModalOpen && (
        <Modal
          onClose={handleCloseModal}
          className="appointmentModal"
          isOpen={isFavsAccessModalOpen}
        >
          <FavoritesAccessCard onClose={handleCloseModal} />
        </Modal>
      )}

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

        <p
          className={s.readMoreText}
          onClick={() => setIsOpenReadMore(!isOpenReadMore)}
        >
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
    </li>
  );
};

export default NannyCard;
