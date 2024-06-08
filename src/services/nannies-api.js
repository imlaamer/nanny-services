import { get, limitToFirst, onValue, query, ref } from 'firebase/database';
import { limit } from '../helpers/constants';
import { db } from '../firebase';

export const getNannies = async () => {
  const limitedNanniesQuery = query(ref(db, 'nannies'), limitToFirst(limit));
  const snapshot = await get(limitedNanniesQuery);
  const data = snapshot.val();

  //   console.log(data);
  return data;
};

//   const limitedNannieQuery = query(ref(db, 'nannies'), limitToFirst(limit));
//   const items = [];

//   onValue(limitedNannieQuery, async (snapshot) => {
//     try {
//       const data = await snapshot.val();
//       // toast.success('Success')

//       data.forEach((object) => {
//         console.log(object);
//         items.push(object);
//       });
//       //виходить що загрузка редакса скоріша за відпрацювання події  і спочатку буде пустий масив що запишеться в редакс
//     } catch (e) {
//       toast.error('Error');
//     }
//   });

// onChildAdded(newMsg, (data) => {
//   // ...
// });

// const query = query(usersRef, orderByChild('email'), equalTo(userEmail));

// const snapshot = await get(limitedNanniesRef);
// console.log(snapshot.val());

// onChildChanged(imitedNanniesRef, (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

// const itemsRef = ref(db, 'nannies');
// const items = [];

//---------
// const itemsPerPage = 3;
// let currentPage = 1;
// const startIndex = (currentPage - 1) * itemsPerPage;
// const snapshot = await get(
//   query(itemsRef),
//   limitToLast(startIndex + itemsPerPage)
// );

// ------childSnapshot.key - filter() по ньому замість айді

//---
// snapshot.forEach((childSnapshot) => {
//   items.push({
//     id: childSnapshot.key,
//     ...childSnapshot.val(),
//   });
// });
// console.log(items);
