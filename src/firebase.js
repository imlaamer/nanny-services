import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database'; // for Realtime DB
import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore'; // for Cloud

import { nanoid } from 'nanoid';
// import { getAnalytics } from 'firebase/analytics';

const API_KEY = import.meta.env.VITE_API_KEY;
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'nannny-services.firebaseapp.com',
  databaseURL: DATABASE_URL,
  projectId: 'nannny-services',
  storageBucket: 'nannny-services.appspot.com',
  messagingSenderId: '893873000977',
  appId: '1:893873000977:web:3be30c2878585d0010d7b0',
  measurementId: 'G-0SNP7N5WMN',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const cloud_db = getFirestore(app);

//getDatabase(app); vs   getDatabase();?
// export const realtime_db = getDatabase(app);

export const db = getDatabase();

//------ refs
const rootUsersFef = ref(db, 'users');
const rootNanniesRef = ref(db, 'nannies');

//-----додати новий вузол / в поточний вузол  users/'  вузол  userId з  даними ( лише якщо не пусте поле)
function writeUserData(username, email) {
  const userId = nanoid(); //-

  //-------генерування key
  // const autoId = rootNanniesRef.push().key; // - check it !

  //rootUsersFef.child(userId.value) - check it !
  set(ref(db, 'users/' + userId), {
    username,
    email,
    favorites: [], //'0'
    token: null,
  });
}
// writeUserData('Lolita', 'test@ghj.com');

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

//------update data  --- check it !

//const newData = {
// favorites: ['1'] ???? як апдейтнути з додаванням а не заміною
//token
// }
//rootUsersFef.child(userId.value).update(newData)

//-------delete data

//rootsRef.child(userId.value).remove()

//userId.value  --- userId ???

//remove() можна видалити цілий вузол /users напр ЧИ ключ ПО ЙОГО VALUE ?

//database.ref('/super-users).child(userId.value).remove() - видалився весь вузол /super-users

//remove().then().catch() - toasts

//-------read data
//щоб прочитати дані треба прикріпити слухачі по рефу чи декількох рефах в бд

//on - onValue зараз наче - щоб встановити різні події для прослуховування

//rootRef.on('child_added', snapshot => {
// console.log('Child(s) added);
// })

//---події
//'child_added'
//'child_removed'
//'child_changed'
//'value' - все що вище ? + 'child_moved'

//.once - те саме що on тільки один раз прослухає

//можна додаввати слухачі  й тільки до певної частини бд а не до всієї бд

//rootRef.child(0).once('event', snapshot => {})

//snapshot  зберігає інфу про дату про добавнення чи модифікацію даних:
//snapshot.val() - те що було додане чи змодифіковане

//------------queries

// QUERY FORMAT ref.orderingFn().querifyingFn()
