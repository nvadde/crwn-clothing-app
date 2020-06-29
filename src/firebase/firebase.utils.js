import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD7kNfjKV27hbQ52Gxg02XCUUL3N4tBauE",
  authDomain: "crwn-db-3834d.firebaseapp.com",
  databaseURL: "https://crwn-db-3834d.firebaseio.com",
  projectId: "crwn-db-3834d",
  storageBucket: "crwn-db-3834d.appspot.com",
  messagingSenderId: "785443878734",
  appId: "1:785443878734:web:c2a107a9627e65e149d01f",
  measurementId: "G-KNKC9LWTLL"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
