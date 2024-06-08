import { useEffect, useState } from 'react';
// import {
//   getDatabase,
//   ref,
//   onValue,
//   child,
//   get,
//   limitToFirst,
//   onChildAdded,
//   onChildChanged,
//   query,
// } from 'firebase/database';

import Container from '../../components/common/Container/Container';
import Dropdown from '../../components/Dropdown/Dropdown';
import NannyCard from '../../components/NannyCard/NannyCard';
import AuthProvider from '../../components/forms/AuthProvider';

import s from './NanniesPage.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { getNanniesData } from '../../redux/nannies/nanniesOperations';
import { selectNannies } from '../../redux/nannies/nanniesSelectors';
import NanniesList from '../../components/NanniesList/NanniesList';

const NanniesPage = () => {
  const dispatch = useDispatch();

  const nannies = useSelector(selectNannies);
  // console.log(nannies);

  useEffect(() => {
    dispatch(getNanniesData()); //
  }, [dispatch]);

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

        <NanniesList nannies={nannies} />

        <AuthProvider />
      </Container>
    </section>
  );
};

export default NanniesPage;
