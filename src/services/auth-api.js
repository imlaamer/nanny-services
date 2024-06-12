import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { child, get, onValue, ref, set, update } from 'firebase/database';

export const createUserAndSetData = async (credentials) => {
  const { username, email, password } = credentials;

  const {
    user: {
      uid,
      metadata: { createdAt },
    },
  } = await createUserWithEmailAndPassword(auth, email, password);

  const user = {
    // id: uid,
    username,
    email,
    createdAt,
  };
  await set(ref(db, 'users/' + uid), user); //return undefined not Promise
  return user;
};

// export const login = async (credentials) => {
//   const { email, password } = credentials;
// };

export const login = async (credentials) => {
  const { email, password } = credentials;

  if (auth.currentUser) {
    throw new Error('You already authorithed'); //temporary for testing
  }

  const {
    user: { uid, accessToken },
  } = await signInWithEmailAndPassword(auth, email, password);

  const usernameSnapshot = await get(child(db, `users/${uid}/username`));
  console.log(usernameSnapshot);
  return;

  // .then((snapshot) => {
  //   if (snapshot.exists()) {
  //     console.log(snapshot.val());
  //   } else {
  //     console.log('No data available');
  //   }
  // })
  // .catch((error) => {
  //   console.error(error);
  // });
  //   onValue(
  //     ref(db, '/users/' + userId),
  //     (snapshot) => {
  //       const username =
  //         (snapshot.val() && snapshot.val().username) || 'Anonymous';
  //       // ...
  //     },
  //     {
  //       onlyOnce: true,
  //     }
  //   );

  const user = {
    token: accessToken,
    // username,
  };
  await update(ref(db, 'users/' + uid), user);

  return { ...user, email };
  //   signInButton.disabled = false;
};

export const logout = async () => {
  if (!auth.currentUser) {
    throw new Error('Not authorized');
  }
  await signOut(auth); //return Promise
  return;
};

// return {
//   user: { email: null, username: null, favorites: [] },
//   token: null,
// };

//   signInButton.disabled = true;

// token: accessToken,

//   createUserWithEmailAndPassword(auth, email, password)
//     .then(
//       ({
//         user: {
//           uid,
//           metadata: { createdAt },
//         },
//       }) => {
//         return set(ref(db, 'users/' + uid), {
//           // id: uid,
//           username: username,
//           email: email,
//           createdAt: createdAt,
//         });
//       }
//     )
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error.message));
