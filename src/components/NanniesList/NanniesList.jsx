import { useEffect, useState } from 'react';
import { useLocation } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../uikit/Button/Button';
import NannyCard from '../NannyCard/NannyCard';

import {
  increaseFavsPage,
  increasePage,
} from '../../redux/nannies/nanniesSlice';
import {
  getNanniesData,
  getRatedNanniesData,
} from '../../redux/nannies/nanniesOperations';
import {
  selectFilter,
  selectIsLoadMore,
  selectIsLoading,
  selectPage,
} from '../../redux/nannies/nanniesSelectors';
import { selectFavorites } from '../../redux/auth/authSelectors';
import { limit } from '../../helpers/constants';

import s from './NanniesList.module.css';

const NanniesList = ({ nannies, isFavoritesPage, favorites }) => {
  const dispatch = useDispatch();

  const isLoadMore = useSelector(selectIsLoadMore);
  const isLoading = useSelector(selectIsLoading);
  const filter = useSelector(selectFilter);
  const page = useSelector(selectPage);
  const visibleNannies = limit * page;

  const handleLoadMore = () => {
    if (!isFavoritesPage) {
     
      if (!filter || filter === 'all') {
        dispatch(getNanniesData());
      }
      if (filter && filter !== 'all') {
        dispatch(getRatedNanniesData(isFavoritesPage));
      }
      dispatch(increasePage()); //послідовність ? можна першим?
    }
    //---------------favs
    if (isFavoritesPage) {
      dispatch(increaseFavsPage());
    }
  };

  return (
    <>
      <ul className={s.nanniesList}>
        {/* {nannies?.map((nanny, index) => (
          <NannyCard key={index} nanny={nanny} favorites={favorites} />
        ))} */}

        {!isFavoritesPage &&
          nannies?.map((nanny, index) => (
            <NannyCard key={index} nanny={nanny} />
          ))}

        {isFavoritesPage &&
          favorites.map((nanny, index) => (
            <NannyCard key={index} nanny={nanny} favorites={favorites} />
          ))}
      </ul>

      {/* !isFavoritesPage && */}
      {isLoadMore && !isLoading && (
        <Button
          className="loadMoreBtn"
          title="Load  more"
          onClick={handleLoadMore}
        />
      )}
      {/* {isFavoritesPage &&
        !isLoading &&
        favorites.length > limit &&
        isLoadMore && (
          <Button
            className="loadMoreBtn"
            title="Load  more"
            onClick={handleLoadMore}
          />
        )} */}
    </>
  );
};

export default NanniesList;
