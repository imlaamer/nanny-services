import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Container from '../../components/common/Container/Container';
import Dropdown from '../../components/Dropdown/Dropdown';
import NanniesList from '../../components/NanniesList/NanniesList';
// import AuthProvider from '../../components/forms/AuthProvider';

import { getNanniesData } from '../../redux/nannies/nanniesOperations';
import { resetNannies, updateLast } from '../../redux/nannies/nanniesSlice';
import {
  selectFilter,
  selectLastValue,
  selectNannies,
  selectPage,
} from '../../redux/nannies/nanniesSelectors';

import s from './NanniesPage.module.css';
import { useLocation } from 'react-use';
import { selectFavorites } from '../../redux/auth/authSelectors';

const NanniesPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isFavoritesPage = location.pathname === '/favorites';
  const favorites = useSelector(selectFavorites);
  const nannies = useSelector(selectNannies);
  const page = useSelector(selectPage);
  const filter = useSelector(selectFilter);
  const lastValue = useSelector(selectLastValue);

  // console.log(lastKey);

  //memo ?
  useEffect(() => {
    dispatch(resetNannies());
  }, [dispatch, isFavoritesPage]);

  useEffect(() => {
    if (!filter) {
      dispatch(getNanniesData()).then((nannies) => {
        console.log('nannies get ');
        // const firstValue = nannies.payload[0].id;
        // const lastNannyValue = nannies.payload[nannies.payload.length - 1].id;
      });
    } else {
      // dispatch(getSortedNanniesData());
    }
  }, [dispatch, page, filter]); //isFavoritesPage

  // useEffect(() => {
  //   const dbRef = ref(getDatabase());
  //   get(child(dbRef, 'nannies'))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         console.log(snapshot.val()); //array
  //       } else {
  //         console.log('No data available');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   //----------it works
  // }, []);

  return (
    <section className={s.nannies}>
      <Container className="nanies-page-container">
        <Dropdown />

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
