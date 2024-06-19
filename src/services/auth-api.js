import {
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  onAuthStateChanged,
  reload,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { child, get, onValue, ref, set, update } from 'firebase/database';

//-------------------REGISTER--------------------
export const createUserAndSetData = async (credentials) => {
  const { username, email, password } = credentials;

  //   const user = userCredential.user;
  const {
    user: {
      uid,
      accessToken,
      //   metadata: { createdAt },
    },
  } = await createUserWithEmailAndPassword(auth, email, password);

  const user = {
    //   id: uid,
    username,
    email,
    favorites: [],
  };

  const data = {
    user: { ...user, id: uid },
    token: accessToken,
  };

  await set(ref(db, 'users/' + uid), user); //return undefined not Promise
  //createdAt
  return data;
};
//-------------------LOGIN--------------------
export const login = async (credentials) => {
  const { email, password } = credentials;

  //delete this after debagging
  if (auth.currentUser) {
    await signOut(auth);
    // console.log('Sign Out');
    return;
    // throw new Error('You already authorithed');
  }

  const {
    user: { uid, accessToken },
  } = await signInWithEmailAndPassword(auth, email, password);

  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `users/${uid}`));
  const { email: userEmail, username, favorites = [] } = snapshot.val();

  const userData = {
    email: userEmail,
    username,
    favorites,
  };

  const data = {
    user: { favorites: [], ...userData, id: uid },
    token: accessToken,
  };

  return data;
};
//------------------LOGOUT--------------------
export const logout = async () => {
  if (!auth.currentUser) {
    throw new Error('Not authorized'); //-
  }
  await signOut(auth); //return Promise
  return;
};
//-------------------REFRESH AND GET USER--------------------
export const refreshAndGetCurrentUser = async (id, thunkAPI) => {
  const auth = getAuth();
  const dbRef = ref(db);
  //----get token
  onAuthStateChanged(auth, async (user) => {
    // console.log(user, 'user');
    if (!user) {
      return thunkAPI.rejectWithValue('No user'); //?
    }
    const token = await getIdToken(user);
    if (!token) {
      //? почитати доки / брати токен з персісту?
      return thunkAPI.rejectWithValue('No token'); //?
    }
  });
  //----get user data
  const snapshot = await get(child(dbRef, `users/${id}`));
  if (!snapshot.exists()) {
    return thunkAPI.rejectWithValue('No user data');
    // return new Promise((_, reject) => {
    //   reject(toast.error('No user data')); //new Error('No user data')
    // });
  }

  const { email, username, favorites = [] } = snapshot.val();
  const user = { email, username, favorites };
  return user;

  // new Promise((_, reject) => {
  //   reject(toast.error('No token'));
  // });
  //----------------------------------
  // console.log(snapshot.val(), 'snapshot 2'); //null

  // onValue(
  //   ref(db, '/users/' + id),
  //   (snapshot) => {
  //     data = snapshot.val() || 'Anonymous';
  //     // const username =
  //     //   (snapshot.val() && snapshot.val().username) || 'Anonymous';
  //     return data;
  //     // ...
  //   },
  //   {
  //     onlyOnce: true,
  //   }
  // );
  //-----------------------
  // const currentUser = credential.user;
  // console.log(firebase.auth().currentUser);
  // firebase.auth().currentUser.reload();

  //   const auth = getAuth();
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       console.log('User is signed in', user);

  //       // User is signed in, see docs for a list of available properties - READ THIS!!!!!
  //       // https://firebase.google.com/docs/reference/js/auth.user
  //       //   const token = await getIdToken(user);

  //       const uid = user.uid;
  //       const dbRef = ref(db);

  //       const snapshot = await get(child(dbRef, `users/${uid}`));
  //       const { email: userEmail, username, favorites = [] } = snapshot.val();
  //       //   console.log(userEmail, username, favorites);

  //       const data = {
  //         user: { email: userEmail, username, favorites },
  //         // token,
  //       };

  //       console.log('signed in user', data); //
  //       return data;
  //     } else {
  //       console.log("You don't have a token /  User is signed out"); //
  //       return null;
  //     }
  //   });
};

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

// const { user: { uid } } = userCredential //for testing
//   console.log(userCredential.user, 'userData from login'); //for testing

// const user = userCredential.user;

//------------from hw
// export const refreshUser = createAsyncThunk(
//   'auth/refreshUser',
//   async (_, thunkApi) => {
//     const { token } = thunkApi.getState().auth;
//     if (!token) return thunkApi.rejectWithValue("You don't have a token!"); //
//     try {
//       const user = await apiRefreshUser(token);
//       return user;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// export const apiRefreshUser = async (token) => {
//   setToken(token);
//   const { data: user } = await apiInstance.get('/users/current');
//   return user;
// };

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
