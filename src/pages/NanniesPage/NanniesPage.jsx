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

const NanniesPage = () => {
  const dispatch = useDispatch();

  const nannies = useSelector(selectNannies);
  const page = useSelector(selectPage);
  const lastValue = useSelector(selectLastValue);

  const filter = useSelector(selectFilter);
  // console.log(lastKey);

  //memo ?
  useEffect(() => {
    if (!filter) {
      dispatch(getNanniesData()).then((nannies) => {
        // const firstValue = nannies.payload[0].id;
        // const lastNannyValue = nannies.payload[nannies.payload.length - 1].id;
      });
    } else {
      // dispatch(getSortedNanniesData());
    }
  }, [dispatch, page, filter]);

  // useEffect(() => {
  //   setKeys(Object.keys(nannies));
  //   // setNanniesWithId(keys.map((key) => ({ id: key, ...nannies[key] })));
  // }, [nannies]);

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

        {/* <AuthProvider /> */}
      </Container>
    </section>
  );
};

export default NanniesPage;
