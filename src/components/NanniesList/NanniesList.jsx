import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../uikit/Button/Button';
import NannyCard from '../NannyCard/NannyCard';
import {
  selectIsLoadMore,
  selectIsLoading,
} from '../../redux/nannies/nanniesSelectors';
import { limit } from '../../helpers/constants';
import { getSortedNannies } from '../../redux/nannies/nanniesOperations';
import s from './NanniesList.module.css';

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

  const visibleFavs = limit * favsPage;
  const isLoadMoreFavs = visibleFavs < favorites.length;
  const currentFavs = !sortedFavorites ? favorites : sortedFavorites;

  const handleLoadMore = () => {
    dispatch(getSortedNannies());
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
