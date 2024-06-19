import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

const API_KEY = import.meta.env.VITE_API_KEY;
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;
const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET;
const MESSAGING_SENDER_ID = import.meta.env.VITE_MESSAGING_SENDER_ID;
const APP_ID = import.meta.env.VITE_APP_ID;
const MEASUREMENT_ID = import.meta.env.VITE_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase();
export const auth = getAuth(app);

//------ refs
// const rootUsersFef = ref(db, 'users');
// const rootNanniesRef = ref(db, 'nannies');

//-----додати новий вузол / в поточний вузол  users/'  вузол  userId з  даними ( лише якщо не пусте поле)
// function writeUserData(username, email) {

//-------генерування key
// const autoId = rootNanniesRef.push().key; // - check it !

//rootUsersFef.child(userId.value) - check it !
// set(ref(db, 'users/' + userId), {
//   username,
//   email,
//   favorites: [], //'0'
//   token: null,
// });
// }
// writeUserData('Lolita', 'test@ghj.com');

// Initialize Firebase Authentication and get a reference to the service

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