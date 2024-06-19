import {
  child,
  get,
  getDatabase,
  limitToFirst,
  onValue,
  query,
  ref,
  startAfter,
  startAt,
  orderByChild,
  orderByValue,
  limitToLast,
  endBefore,
  endAt,
} from 'firebase/database';
import { limit } from '../helpers/constants';
import { db } from '../firebase';
import { toast } from 'react-toastify';

export const getNannies = async (lastValue) => {
  let nanniesQuery = null;

  if (!lastValue) {
    nanniesQuery = query(
      ref(db, 'nannies'),
      orderByChild('id'), //замість createdAt
      limitToFirst(limit) //startIndex + limit
    );
  } else {
    nanniesQuery = query(
      ref(db, 'nannies'),
      orderByChild('id'),
      startAfter(lastValue),
      limitToFirst(limit)
    );
  }
    const snapshot = await get(nanniesQuery);
  if (!snapshot.val()) {
    toast.error('No nannies'); //
    return [];
  }
  const values = Object.values(snapshot.val());
  return values;
};

//------sorting

//розділити на 2 санки ?
export const getRatedNannies = async (
  filter,
  firstValue,
  lastValue,
  isFavoritesPage,
  id
) => {
  let nanniesQuery = null;
  let favsQuery = null;

  switch (filter) {
    case 'popular':
      if (!firstValue) {
        if (!isFavoritesPage) {
          nanniesQuery = query(
            ref(db, 'nannies'),
            orderByChild('rating'),
            limitToLast(limit)
          );
        } else {
          favsQuery = query(
            ref(db, 'users/' + id + '/favorites'),
            orderByChild('rating'),
            limitToLast(limit)
          );
        }
      } else {
        if (!isFavoritesPage) {
          nanniesQuery = query(
            ref(db, 'nannies'),
            orderByChild('rating'),
            endBefore(lastValue), // ?
            limitToLast(limit)
          );
        } else {
          favsQuery = query(
            ref(db, 'users/' + id + '/favorites'),
            orderByChild('rating'),
            endBefore(lastValue), // ?
            limitToLast(limit)
          );
        }
      }
      break;

    case 'not-popular':
      if (!lastValue) {
        nanniesQuery = query(
          ref(db, 'nannies'),
          orderByChild('rating'),
          limitToFirst(limit)
        );
      } else {
        nanniesQuery = query(
          ref(db, 'nannies'),
          orderByChild('rating'),
          startAfter(lastValue), //
          limitToFirst(limit)
        );
      }
      break;
    default:
      console.log('Unknown value');
  }
  const snapshot = await get(nanniesQuery);
  if (!snapshot.val()) {
    toast.error('There is no more nannies');
    return [];
  }
  let values = Object.values(snapshot.val()); //

  switch (filter) {
    case 'popular':
      return values.sort((a, b) => b.rating - a.rating);
    case 'not-popular':
      return values.sort((a, b) => a.rating - b.rating);
    default:
      console.log('Unknown value');
  }
  return values;
};

//--------------favorites
export const getFavorites = async (lastValue, isFavoritesPage, id) => {
  let favsQuery = null;

  if (!lastValue) {
    favsQuery = query(
      ref(db, 'users/' + id + '/favorites'),
      orderByChild('id'), // додай в indexOf
      limitToFirst(limit)
    );
  } else {
    favsQuery = query(
      ref(db, 'users/' + id + '/favorites'),
      orderByChild('id'), // додай в indexOf
      startAfter(lastValue),
      limitToFirst(limit)
    );
  }

  const snapshot = await get(favsQuery);
  if (!snapshot.val()) {
    toast.error('No favorites'); //-
    return [];
  }
  const values = Object.values(snapshot.val());

  console.log(values, 'values'); //-
  return values;
};
