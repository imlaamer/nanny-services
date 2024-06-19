import { useEffect, useState } from 'react';
import { getAuth, signInWithPopup } from 'firebase/auth';
// import { app } from './firebase';
import { app, googleAuthProvider } from '../../firebase';

const AuthProvider = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(auth.currentUser); //auth.currentUser - буде null якщо не автентифікувався

  //якщо null провести автентифікацію

  //   useEffect(() => {

  const handleClick = () => {
    const unsubscribe = auth.onAuthStateChanged((maybeUser) => {
      if (maybeUser !== null) {
        console.log(maybeUser, 'maybeUser');
        return setUser(maybeUser);
      }
      //автентифікація - декілька шляхів - попап

      signInWithPopup(auth, googleAuthProvider)
        .then((credentials) => setUser(credentials.user))
        .catch((e) => console.log(e));

      //повертає проміс з креденшілс
    });

    // console.log('log');
    return unsubscribe;
  };

  //   }, [auth]);

  //   return user !== null ? <>{user.displayName}</> : <>loading</>;
  return (
    <>
      <button onClick={handleClick}>Autenticate</button>
      <p style={{ color: 'red' }}>
        {user !== null ? user.displayName : 'loading'}
      </p>
    </>
  );
};

export default AuthProvider;

//вимикати стрікт мод - бо автентифікація відпрауює 2чі ( хук юз еффект відпрацьовують 2чі)
