import {
  get,
  limitToFirst,
  query,
  ref,
  startAfter,
  orderByChild,
  limitToLast,
  endBefore,
} from 'firebase/database';
import { toast } from 'react-toastify';
import { limit } from '../helpers/constants';
import { db } from '../firebase';

export const getNannies = async (lastValue) => {
  let nanniesQuery = null;

  if (!lastValue) {
    nanniesQuery = query(
      ref(db, 'nannies'),
      orderByChild('id'), //замість createdAt //-??
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

export const getSortedNannies = async (filter, lastValue) => {
  let nanniesQuery = null;

  switch (filter) {
    case 'popular':
      if (!lastValue) {
        nanniesQuery = query(
          ref(db, 'nannies'),
          orderByChild('rating'),
          limitToLast(limit)
        );
      } else {
        nanniesQuery = query(
          ref(db, 'nannies'),
          orderByChild('rating'),
          endBefore(lastValue),
          limitToLast(limit)
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
          startAfter(lastValue),
          limitToFirst(limit)
        );
      }
      break;
    case null:
    case 'a-to-z':
      if (!lastValue) {
        nanniesQuery = query(
          ref(db, 'nannies'),
          orderByChild('name'),
          limitToFirst(limit)
        );
      } else {
        nanniesQuery = query(
          ref(db, 'nannies'),
          orderByChild('name'),
          startAfter(lastValue),
          limitToFirst(limit)
        );
      }
      break;
    case 'z-to-a':
      if (!lastValue) {
        nanniesQuery = query(
          ref(db, 'nannies'),
          orderByChild('name'),
          limitToLast(limit)
        );
      } else {
        nanniesQuery = query(
          ref(db, 'nannies'),
          orderByChild('name'),
          endBefore(lastValue),
          limitToLast(limit)
        );
      }
      break;
    case 'less-than-10': //9, 8..
      if (!lastValue) {
        nanniesQuery = query(
          ref(db, 'nannies'),
          orderByChild('price_per_hour'),
          endBefore(10),
          limitToLast(limit)
        );
      } else {
        nanniesQuery = query(
          ref(db, 'nannies'),
          orderByChild('price_per_hour'),
          endBefore(lastValue), // ????!!!!!!! key and value приймає..key ще передавати щоб не буо повтору і можна endAt startAt?
          limitToLast(limit)
        );
      }
      break;
    case 'greater-than-10': //11 12..
      if (!lastValue) {
        nanniesQuery = query(
          ref(db, 'nannies'),
          orderByChild('price_per_hour'),
          startAfter(10),
          limitToFirst(limit)
        );
      } else {
        nanniesQuery = query(
          ref(db, 'nannies'),
          orderByChild('price_per_hour'),
          startAfter(lastValue),
          limitToFirst(limit)
        );
      }
      break;
    default:
      console.log('Unknown value');
    // nanniesQuery = query(
    //   ref(db, 'nannies'),
    //   orderByChild('id'),
    //   limitToFirst(limit)
    // );
  }
  const snapshot = await get(nanniesQuery);
  if (!snapshot.val()) {
    toast.error('There is no more nannies');
    return [];
  }
  let values = Object.values(snapshot.val());

  switch (filter) {
    case 'popular':
      return values.sort((a, b) => b.rating - a.rating);
    case 'not-popular':
      return values.sort((a, b) => a.rating - b.rating);
    case null:
    case 'a-to-z':
      return values.sort((a, b) => a.name.localeCompare(b.name));
    case 'z-to-a':
      return values.sort((a, b) => b.name.localeCompare(a.name));
    case 'less-than-10':
      return values.sort((a, b) => b.price_per_hour - a.price_per_hour);
    case 'greater-than-10':
      return values.sort((a, b) => a.price_per_hour - b.price_per_hour);
    default:
      console.log('Unknown value');
  }
  return values;
};

//--------------favorites
export const getFavorites = async (lastValue, id) => {
  let favsQuery = null;

  if (!lastValue) {
    favsQuery = query(
      ref(db, 'users/' + id + '/favorites'),
      orderByChild('id'),
      limitToFirst(limit)
    );
  } else {
    favsQuery = query(
      ref(db, 'users/' + id + '/favorites'),
      orderByChild('id'),
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

  // console.log(values, 'values'); //-
  return values;
};

export const getSortedFavorites = async (filter, lastValue, id) => {
  let favsQuery = null;

  switch (filter) {
    case 'popular':
      if (!lastValue) {
        favsQuery = query(
          ref(db, 'users/' + id + '/favorites'),
          orderByChild('rating'),
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
      break;
    case 'not-popular':
      if (!lastValue) {
        favsQuery = query(
          ref(db, 'users/' + id + '/favorites'),
          orderByChild('rating'),
          limitToFirst(limit)
        );
      } else {
        favsQuery = query(
          ref(db, 'users/' + id + '/favorites'),
          orderByChild('rating'),
          startAfter(lastValue), //
          limitToFirst(limit)
        );
      }
      break;
    case null:
    case 'a-to-z':
      if (!lastValue) {
        favsQuery = query(
          ref(db, 'users/' + id + '/favorites'),
          orderByChild('name'),
          limitToFirst(limit)
        );
      } else {
        favsQuery = query(
          ref(db, 'users/' + id + '/favorites'),
          orderByChild('name'),
          startAfter(lastValue),
          limitToFirst(limit)
        );
      }
      break;
    case 'z-to-a':
      if (!lastValue) {
        favsQuery = query(
          ref(db, 'users/' + id + '/favorites'),
          orderByChild('name'),
          limitToLast(limit)
        );
      } else {
        favsQuery = query(
          ref(db, 'users/' + id + '/favorites'),
          orderByChild('name'),
          endBefore(lastValue),
          limitToLast(limit)
        );
      }
      break;
    case 'less-than-10': //9, 8..
      if (!lastValue) {
        favsQuery = query(
          ref(db, 'users/' + id + '/favorites'),
          orderByChild('price_per_hour'),
          endBefore(10),
          limitToLast(limit)
        );
      } else {
        favsQuery = query(
          ref(db, 'users/' + id + '/favorites'),
          orderByChild('price_per_hour'),
          endBefore(lastValue), // ????!!!!!!! key and value приймає..key ще передавати щоб не буо повтору і можна endAt startAt?
          limitToLast(limit)
        );
      }
      break;
    case 'greater-than-10': //11 12..
      if (!lastValue) {
        favsQuery = query(
          ref(db, 'users/' + id + '/favorites'),
          orderByChild('price_per_hour'),
          startAfter(10),
          limitToFirst(limit)
        );
      } else {
        favsQuery = query(
          ref(db, 'users/' + id + '/favorites'),
          orderByChild('price_per_hour'),
          startAfter(lastValue),
          limitToFirst(limit)
        );
      }
      break;
    default:
      console.log('Unknown value');
    // nanniesQuery = query(
    //   ref(db, 'nannies'),
    //   orderByChild('id'),
    //   limitToFirst(limit)
    // );
  }
  const snapshot = await get(favsQuery);
  if (!snapshot.val()) {
    toast.error('There is no more favorites');
    return [];
  }
  let values = Object.values(snapshot.val());

  switch (filter) {
    case 'popular':
      return values.sort((a, b) => b.rating - a.rating);
    case 'not-popular':
      return values.sort((a, b) => a.rating - b.rating);
    case null:
    case 'a-to-z':
      return values.sort((a, b) => a.name.localeCompare(b.name));
    case 'z-to-a':
      return values.sort((a, b) => b.name.localeCompare(a.name));
    case 'less-than-10':
      return values.sort((a, b) => b.price_per_hour - a.price_per_hour);
    case 'greater-than-10':
      return values.sort((a, b) => a.price_per_hour - b.price_per_hour);
    default:
      console.log('Unknown value');
  }
  return values;
};
