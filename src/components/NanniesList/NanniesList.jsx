import { useEffect, useState } from 'react';
import { useLocation } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../uikit/Button/Button';
import NannyCard from '../NannyCard/NannyCard';

// import {
//   // increaseFavsPage,
//   increasePage,
// } from '../../redux/nannies/nanniesSlice';
import // getNanniesData,
// getSortedNanniesData,
'../../redux/nannies/nanniesOperations';
import {
  selectFilter,
  selectIsLoadMore,
  // selectLoading,
  selectIsLoading,
  // selectPage,
} from '../../redux/nannies/nanniesSelectors';
// import { selectFavorites } from '../../redux/auth/authSelectors';
import { limit } from '../../helpers/constants';

import s from './NanniesList.module.css';
import {
  getNannies,
  getSortedNannies,
} from '../../redux/nannies/nanniesOperations';

const NanniesList = ({
  nannies,
  isFavoritesPage = false,
  favorites,
  sortedFavorites = [],
}) => {
  const dispatch = useDispatch();
  const [favsPage, setFavsPage] = useState(1);

  const isLoadMore = useSelector(selectIsLoadMore);
  const isLoading = useSelector(selectIsLoading);

  const visibleFavs = limit * favsPage; //3 * 1 . 3 * 2
  const isLoadMoreFavs = visibleFavs < favorites.length;

  const currentFavs = !sortedFavorites ? favorites : sortedFavorites;

  const handleLoadMore = () => {
    dispatch(getSortedNannies())
      .unwrap()
      .then((data) => {});
  };

  const handleLoadMoreFavs = () => {
    setFavsPage(favsPage + 1);
  };

  return (
    <>
      <ul className={s.nanniesList}>
        {!isFavoritesPage &&
          nannies?.map((nanny, index) => (
            <NannyCard key={index} nanny={nanny} favorites={favorites} />
          ))}

        {isFavoritesPage &&
          currentFavs
            ?.slice(0, visibleFavs)
            .map((nanny, index) => (
              <NannyCard
                key={index}
                nanny={nanny}
                favorites={favorites}
                isFavoritesPage={isFavoritesPage}
              />
            ))}
      </ul>

      {!isFavoritesPage && isLoadMore && !isLoading && (
        <Button
          className="loadMoreBtn"
          title="Load more"
          onClick={handleLoadMore}
        />
      )}
      {isFavoritesPage && isLoadMoreFavs && isLoadMore && (
        <Button
          className="loadMoreBtn"
          title="Load more"
          onClick={handleLoadMoreFavs}
        />
      )}
    </>
  );
};

export default NanniesList;

// isFavoritesPage &&
//         !isLoading &&
//         favorites.length > limit &&
//         isLoadMore &&
