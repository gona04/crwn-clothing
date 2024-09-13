import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR45g-7RVWViiHOs4QFJhGo8MTL4zLQfI",
  authDomain: "crwn-clothing-db-firebas-792f0.firebaseapp.com",
  projectId: "crwn-clothing-db-firebas-792f0",
  storageBucket: "crwn-clothing-db-firebas-792f0.appspot.com",
  messagingSenderId: "310471740686",
  appId: "1:310471740686:web:09b091ab32d14285ff1b5f",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
      console.log('User document created:', userAuth);
    } catch (error) {
      console.error('Error creating the user document', error);
    }
  } else {
    console.log('User document already exists:', userAuth);
  }

  return userDocRef;
};