import { useLocation } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';

import Container from '../../components/common/Container/Container';
import Dropdown from '../../components/Dropdown/Dropdown';
import NanniesList from '../../components/NanniesList/NanniesList';

import {
  getSortedNanniesData,
} from '../../redux/nannies/nanniesOperations';
import {
  resetNannies,
} from '../../redux/nannies/nanniesSlice';
import {
  selectNannies,
} from '../../redux/nannies/nanniesSelectors';
import { selectFavorites } from '../../redux/auth/authSelectors';

import s from './NanniesPage.module.css';

const NanniesPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isFavoritesPage = location.pathname === '/favorites';
  const favorites = useSelector(selectFavorites);
  const nannies = useSelector(selectNannies);
 
  useEffect(() => {
    dispatch(resetNannies());
  }, [dispatch, isFavoritesPage]);

  useEffect(() => {
    dispatch(getSortedNanniesData());
  }, [dispatch]); 

  return (
    <section className={s.nannies}>
      <Container className="nanies-page-container">
        <Dropdown isFavoritesPage={isFavoritesPage} />

        <NanniesList
          nannies={nannies}
          isFavoritesPage={isFavoritesPage}
          favorites={favorites}
        />
      </Container>
    </section>
  );
};

export default NanniesPage;
