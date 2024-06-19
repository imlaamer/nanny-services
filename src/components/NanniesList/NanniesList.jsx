import { useEffect, useState } from 'react';
import { useLocation } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../uikit/Button/Button';
import NannyCard from '../NannyCard/NannyCard';

import { increasePage } from '../../redux/nannies/nanniesSlice';
import { getRatedNanniesData } from '../../redux/nannies/nanniesOperations';
import {
  selectFilter,
  selectIsLoadMore,
  selectIsLoading,
  selectPage,
} from '../../redux/nannies/nanniesSelectors';
import { selectFavorites } from '../../redux/auth/authSelectors';
import { limit } from '../../helpers/constants';

import s from './NanniesList.module.css';

const NanniesList = ({ nannies }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isFavoritesPage = location.pathname === '/favorites';

  const isLoadMore = useSelector(selectIsLoadMore);
  const isLoading = useSelector(selectIsLoading);
  const filter = useSelector(selectFilter);
  const favorites = useSelector(selectFavorites);
  const page = useSelector(selectPage);
  const visibleNannies = limit * page;

  const handleLoadMore = () => {
    if (filter) {
      dispatch(getRatedNanniesData());
      return;
    }
    dispatch(increasePage());
    // dispatch(getNanniesData(page));
  };

  return (
    <>
      <ul className={s.nanniesList}>
        {!isFavoritesPage &&
          nannies?.map((nanny, index) => (
            <NannyCard key={index} nanny={nanny} />
          ))}
        {isFavoritesPage &&
          favorites
            ?.slice(0, visibleNannies)
            .map((nanny, index) => <NannyCard key={index} nanny={nanny} />)}
      </ul>

      {isLoadMore && !isLoading && (
        <Button
          className="loadMoreBtn"
          title="Load  more"
          onClick={handleLoadMore}
        />
      )}
    </>
  );
};

export default NanniesList;
