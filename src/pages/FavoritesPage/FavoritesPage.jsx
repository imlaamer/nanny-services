import { useLocation } from 'react-use';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '../../components/common/Container/Container';
import Icon from '../../components/common/Icon/Icon';
import NanniesList from '../../components/NanniesList/NanniesList';
import Dropdown from '../../components/Dropdown/Dropdown';

import { resetNannies, sortFavorites } from '../../redux/nannies/nanniesSlice';
import {
  selectFavorites,
  selectNannies,
  selectSortedFavorites,
} from '../../redux/nannies/nanniesSelectors';

import s from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isFavoritesPage = location.pathname === '/favorites';
  const nannies = useSelector(selectNannies);
  const favorites = useSelector(selectFavorites);
  const sortedFavorites = useSelector(selectSortedFavorites);

  useEffect(() => {
    dispatch(resetNannies());
    dispatch(sortFavorites());
  }, [dispatch, isFavoritesPage]);

  return (
    <section className={s.favoritesSection}>
      <Container className="favorites-page-container">
        <Dropdown isFavoritesPage={isFavoritesPage} favorites={favorites} />

        {favorites?.length !== 0 && (
          <NanniesList
            nannies={nannies} //-
            isFavoritesPage={isFavoritesPage}
            favorites={favorites}
            sortedFavorites={sortedFavorites}
          />
        )}

        {!favorites?.length === 0 && sortedFavorites?.length === 0 && (
          <div style={{ fontSize: 22, textAlign: 'center' }}>
            We didn`t find anything
          </div>
        )}

        {favorites?.length === 0 && (
          <div className={s.noFavsBox}>
            <div className={s.noFavsContainer}>
              <span className={s.noFavsText}>
                You don`t have any favorites yet
              </span>
              <Icon id={'heart-red'} height="120" width="120" />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default FavoritesPage;
