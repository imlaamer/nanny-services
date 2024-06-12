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
      //startAfter - value, key
    );
  } else {
    nanniesQuery = query(
      ref(db, 'nannies'),
      orderByChild('id'),
      startAfter(lastValue),
      limitToFirst(limit)
    );
    // console.log(nanniesQuery, 'query');
  }

  const snapshot = await get(nanniesQuery);

  if (!snapshot.val()) {
    console.log(snapshot.val(), 'snapshot.val()');
    toast.error('There is no more nannies');
    return [];
  }

  const data = snapshot.val();
  const values = Object.values(data);
  return values;
};
getNannies();

//------sorting

//розділити на 2 санки ?
export const getRatedNannies = async (filter, firstValue, lastValue) => {
  let nanniesQuery = null;

  switch (filter) {
    case 'popular':
      if (!firstValue) {
        nanniesQuery = query(
          ref(db, 'nannies'),
          orderByChild('rating'),
          limitToLast(limit)
          // limitToFirst(limit)
        );
      } else {
        nanniesQuery = query(
          ref(db, 'nannies'),
          orderByChild('rating'),
          // endAt(lastValue),
          endBefore(lastValue), // ?
          // startAt(lastValue),
          // startAfter(firstValue) //startAfter - value, key
          limitToLast(limit)
          // limitToFirst(limit)
        );
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
          // startAt(lastValue),
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
    console.log(snapshot.val(), 'snapshot.val()');
    toast.error('There is no more nannies');
    return [];
  }

  const data = snapshot.val();
  let values = Object.values(data);

  switch (filter) {
    case 'popular':
      return values.sort((a, b) => b.rating - a.rating);
    case 'not-popular':
      return values.sort((a, b) => a.rating - b.rating);

    default:
      console.log('Unknown value');
  }

  // console.log(values, 'values');
  return values;
};
