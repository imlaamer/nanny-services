import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import Cards from '../../components/Cards/Cards';
import Container from '../../components/common/Container/Container';
// import Icon from '../../components/Icon/Icon';
import Button from '../../uikit/Button/Button';
// import { selectFavorites } from '../../redux/adverts/advertsSelectors';
// import { POSTS_PER_PAGE } from '../../helpers/constants';

import s from './FavoritesPage.module.css';
import { resetNannies } from '../../redux/nannies/nanniesSlice';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const handleLoadMore = () => {};

  useEffect(() => {
    dispatch(resetNannies());
  }, [dispatch]);

  return (
    <section className={s.favoritesSection}>
      <Container className="favorites-page-container">
        {/* <Cards /> */}

        <div className={s.noFavsBox}>
          <div className={s.noFavsContainer}>
            <span className={s.noFavsText}>
              You don`t have any favorites yet
            </span>
            {/* <Icon id={'heart'} size="120" fill={'#E44848'} stroke={'#E44848'} /> */}
          </div>
        </div>

        <Button onClick={handleLoadMore} className="load-more-cards-btn">
          Load more
        </Button>
      </Container>
    </section>
  );
};

export default FavoritesPage;
