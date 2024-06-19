import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import Cards from '../../components/Cards/Cards';
import Container from '../../components/common/Container/Container';
import Icon from '../../components/common/Icon/Icon';
import Button from '../../uikit/Button/Button';
// import { selectFavorites } from '../../redux/adverts/advertsSelectors';
// import { POSTS_PER_PAGE } from '../../helpers/constants';

import { resetNannies } from '../../redux/nannies/nanniesSlice';
import { selectFavorites } from '../../redux/auth/authSelectors';
import s from './FavoritesPage.module.css';
import NanniesList from '../../components/NanniesList/NanniesList';

const FavoritesPage = () => {
  const favorites = useSelector(selectFavorites);

  const dispatch = useDispatch();
  const handleLoadMore = () => {};

  useEffect(() => {
    dispatch(resetNannies());
  }, [dispatch]);

  return (
    <section className={s.favoritesSection}>
      <Container className="favorites-page-container">
        {/* <Cards /> */}
        {favorites?.length !== 0 && <NanniesList />}
        {favorites?.length === 0 && (
          <div className={s.noFavsBox}>
            <div className={s.noFavsContainer}>
              <span className={s.noFavsText}>
                You don`t have any favorites yet
              </span>
              <Icon
                id={'heart-red'}
                height="120"
                width="120"
                // fill={'#E44848'}
                // stroke={'#E44848'}
              />
            </div>
          </div>
        )}
        {/* {favorites?.length !== 0 && (
          <Button onClick={handleLoadMore} className="load-more-cards-btn">
            Load more
          </Button>
        )} */}
      </Container>
    </section>
  );
};

export default FavoritesPage;
